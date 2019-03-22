import React, { useState } from 'react'
import styled from 'styled-components'
import PageTitleFullscreen from '../../common/PageTitleFullscreen'

const StyledForm = styled.form`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 20px;
`

const gapi = window.gapi

export default function PlaylistComponent({ onSubmit, setPlaylistItems }) {
  const [playlists, setPlaylists] = useState([])
  const [selectedPlaylist, setSelectedPlaylist] = useState()
  const [initialized, setInitialized] = useState(false)

  if (!initialized) {
    gapi.client.youtube.playlists
      .list({
        mine: 'true',
        part: 'snippet',
        maxResults: '50',
      })
      .then(response => {
        responseHandler(response)
      })
      .catch(err => console.log(err))
    setTimeout(() => {
      setInitialized(true)
    }, 1000)
  }

  function responseHandler(response) {
    setPlaylists(response.result.items)
  }

  function onChangeHandler(event) {
    setSelectedPlaylist(event.target.value)
    gapi.client.youtube.playlistItems
      .list({
        maxResults: '50',
        part: 'snippet,contentDetails,status,id',
        playlistId: event.target.value,
      })
      .then(response => {
        console.log(response.result.items)
        setPlaylistItems(
          response.result.items.map(item => {
            return {
              id: item.contentDetails.videoId,
              title: item.snippet.title,
              notes: item.snippet.description,
              backgroundImageUrl: item.snippet.thumbnails.high.url,
              status: 0,
            }
          })
        )
      })
      .catch(err => console.log(err))
    // onChange(playlistItems)
  }

  function onSubmitHandler(event) {
    event.preventDefault()
    onSubmit(event.target.value)
  }

  return (
    <React.Fragment>
      <PageTitleFullscreen title="Select a playlist" />
      <StyledForm onSubmit={onSubmitHandler}>
        <select
          value={selectedPlaylist}
          defaultValue={'default'}
          onChange={onChangeHandler}
        >
          <option disabled value={'default'}>
            -- select a playlist --
          </option>
          {initialized &&
            playlists &&
            playlists.length &&
            playlists.map(item => (
              <option key={item.id} value={item.id}>
                {item.snippet.localized.title}
              </option>
            ))}
        </select>
        <input type="submit" value="Load videos from playlist" />
      </StyledForm>
    </React.Fragment>
  )
}
