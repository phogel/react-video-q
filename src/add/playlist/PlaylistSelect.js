import React, { useState } from 'react'
import styled from 'styled-components'
import PageTitleFullscreen from '../../common/PageTitleFullscreen'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`

const StyledForm = styled.form`
  position: relative;
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 20px;
  > select {
    appearance: none;
  }
  :before {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 0;
    height: 0;
    padding: 0;
    content: '';
    border-left: 0.25em solid transparent;
    border-right: 0.25em solid transparent;
    border-top: 0.375em solid #e0e0e0;
    pointer-events: none;
  }
`

const StyledSelect = styled.select`
  font-family: inherit;
  background-color: transparent;
  width: 100%;
  padding: 4px 0;
  font-size: 16px;
  color: #7c7c7c;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  :focus {
    outline: none;
  }
`

const gapi = window.gapi

export default function PlaylistComponent({
  onSubmit,
  setPlaylistItems,
  logout,
}) {
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
        setPlaylistItems(
          response.result.items
            .map(item => {
              function url() {
                if (item.snippet.thumbnails.hasOwnProperty('maxres')) {
                  return item.snippet.thumbnails.maxres.url
                } else if (item.snippet.thumbnails.hasOwnProperty('default')) {
                  return item.snippet.thumbnails.default.url
                } else if (item.snippet.thumbnails.hasOwnProperty('high')) {
                  return item.snippet.thumbnails.high.url
                } else if (item.snippet.thumbnails.hasOwnProperty('medium')) {
                  return item.snippet.thumbnails.medium.url
                } else if (item.snippet.thumbnails.hasOwnProperty('default')) {
                  return item.snippet.thumbnails.default.url
                }
              }
              if (item.status.privacyStatus === 'private') {
                return null
              } else {
                return {
                  id: item.contentDetails.videoId,
                  title: item.snippet.title,
                  notes: item.snippet.description,
                  backgroundImageUrl: url(),
                  status: 0,
                  tags: [],
                }
              }
            })
            .filter(item => item !== null)
        )
      })
      .catch(err => console.log(err))
  }

  function onSubmitHandler(event) {
    event.preventDefault()
    onSubmit(event.target.value)
  }

  return (
    <React.Fragment>
      <Grid>
        <PageTitleFullscreen title="Select a playlist" />
        <button
          style={{ height: '30px', fontSize: '14px' }}
          onClick={() => logout()}
        >
          Log Out
        </button>
      </Grid>
      <StyledForm onSubmit={onSubmitHandler}>
        <StyledSelect
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
        </StyledSelect>
        <input type="submit" value="Add to VIDEQ" />
      </StyledForm>
    </React.Fragment>
  )
}
