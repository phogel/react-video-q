import React from 'react'
import styled from 'styled-components'
import Youtube from './YouTube'

const Grid = styled.section`
  display: grid;
  grid-auto-rows: auto;
  width: 100%;
  margin: auto 0;
  grid-gap: 20px;
  padding: 20px;
`

export default function LoginPage() {
  return (
    // <Youtube />
    <Grid id="content">
      Log In With Google
      <button id="authorize-button">Log In</button>
      <button id="signout-button">Log Out</button>
      <div id="content">
        <form id="channel-form">
          <div id="input-field">
            <input
              id="channel-input"
              placeholder="Enter Channel Name"
              type="text"
            />
            <input value="Get Channel Data" type="submit" />

            {/* <input name="playlist" placeholder="Playlist name" type="text" />
            <label htmlFor="playlist">Enter playlist name</label>
            <input type="submit" value="Load videos from playlist" /> */}
          </div>
        </form>
        <div id="video-container" />
      </div>
    </Grid>
  )
}
