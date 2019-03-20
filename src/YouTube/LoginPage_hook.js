import React from 'react'
import styled from 'styled-components'
import gapi from 'gapi-client'

const Grid = styled.section`
  display: grid;
  grid-auto-rows: auto;
  width: 100%;
  margin: auto 0;
  grid-gap: 20px;
  padding: 20px;
`

export default function LoginPage_hook() {
  // Options
  const CLIENT_ID =
    '843342214316-febn2vufffq9heqdut8vhtlfvqjh15sd.apps.googleusercontent.com'
  const DISCOVERY_DOCS = [
    'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
  ]
  const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly'

  const authorizeButton = document.getElementById('authorize-button')
  const signoutButton = document.getElementById('signout-button')
  const content = document.getElementById('content')
  const channelForm = document.getElementById('channel-form')
  const channelInput = document.getElementById('channel-input')
  const videoContainer = document.getElementById('video-container')

  const defaultChannel = 'techguyweb'

  // const xhr = new XMLHttpRequest(),
  //   method = 'GET',
  //   url = 'https://apis.google.com/js/api.js'

  // xhr.open(method, url, true)
  // xhr.onreadystatechange = function() {
  //   if (xhr.readyState === 'complete') {
  //     window.onload = handleClientLoad
  //     console.log('hello')
  //   }
  // }

  // Load auth2 library
  function handleClientLoad() {
    console.log('handleClientLoad')
    gapi.load('client:auth2', initClient)
  }

  window.handleClientLoad = handleClientLoad

  // Init API client library and set up sign in listeners
  function initClient() {
    gapi.client
      .init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES,
      })
      .then(() => {
        // Listen for sign in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)
        // Handle initial sign in state
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
        authorizeButton.onclick = handleAuthClick
        signoutButton.onclick = handleSignoutClick
      })
  }

  // Update UI sign in state changes
  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authorizeButton.style.display = 'none'
      signoutButton.style.display = 'block'
      content.style.display = 'block'
      videoContainer.style.display = 'block'
      getChannel(defaultChannel)
    } else {
      authorizeButton.style.display = 'block'
      signoutButton.style.display = 'none'
      content.style.display = 'none'
      videoContainer.style.display = 'none'
    }
  }

  // Handle login
  function handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn()
  }

  // Handle logout
  function handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut()
  }

  // Get channel from API
  function getChannel(channel) {
    console.log(channel)
  }

  return (
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
