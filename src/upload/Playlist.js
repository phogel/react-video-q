import React, { useState } from 'react'
import styled from 'styled-components'
import PageTitleFullscreen from '../common/PageTitleFullscreen'

const StyledForm = styled.form`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 20px;
`

const gapi = window.gapi

export default function ChannelComponent() {
  const [playlists, setPlaylists] = useState('')
  const [selectedPlaylist, setSelectedPlaylist] = useState('')
  const [initialized, setInitialized] = useState(false)

  function responseHandler(response) {
    setPlaylists(response.result.items)
  }

  if (!initialized) {
    console.log(initialized)
    gapi.client.youtube.playlists
      .list({
        mine: 'true',
        part: 'snippet',
      })
      .then(response => {
        responseHandler(response)
      })
      .catch(err => alert('No playlist by that name'))
    setTimeout(() => {
      setInitialized(true)
    }, 300)
  }

  function onChangeHandler(event) {
    setSelectedPlaylist({ selectedPlaylist: event.target.value })
  }

  function onSubmitHandler(event) {
    alert('your playlist chosen is: ' + selectedPlaylist)
    event.preventDefault()
  }

  return (
    <React.Fragment>
      <PageTitleFullscreen title="Select a playlist" />
      <StyledForm onSubmit={onSubmitHandler}>
        <select value={selectedPlaylist} onChange={e => onChangeHandler(e)}>
          {console.log(playlists)}
          {initialized &&
            playlists.map(item => (
              <option key={item.id} value={item.snippet.localized.title}>
                {item.snippet.localized.title}
              </option>
            ))}
        </select>
        <input type="submit" value="Load videos from playlist" />
      </StyledForm>
    </React.Fragment>
  )
}
