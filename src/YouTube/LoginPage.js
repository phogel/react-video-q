import React, { Component } from 'react'
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
//     window.onload = this.handleClientLoad
//     console.log('hello')
//   }
// }

export default class LoginPage extends Component {
  constructor(props) {
    super(props)
    window.handleClientLoad = () => {
      this.handleClientLoad()
    }
  }
  // ComponentDidMount() {
  //   loadjs('./js/main.js', function() {
  //     loadjs('./js/common_scripts.js')
  //   })
  // }

  // Load auth2 library
  handleClientLoad() {
    console.log('handleClientLoad')
    gapi.load('client:auth2', this.initClient)
  }

  // Init API client library and set up sign in listeners
  initClient() {
    gapi.client
      .init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES,
      })
      .then(() => {
        // Listen for sign in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus)
        // Handle initial sign in state
        this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
        authorizeButton.onclick = this.handleAuthClick
        signoutButton.onclick = this.handleSignoutClick
      })
  }

  // Update UI sign in state changes
  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authorizeButton.style.display = 'none'
      signoutButton.style.display = 'block'
      content.style.display = 'block'
      videoContainer.style.display = 'block'
      this.getChannel(defaultChannel)
    } else {
      authorizeButton.style.display = 'block'
      signoutButton.style.display = 'none'
      content.style.display = 'none'
      videoContainer.style.display = 'none'
    }
  }

  // Handle login
  handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn()
  }

  // Handle logout
  handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut()
  }

  // Get channel from API
  getChannel(channel) {
    console.log(channel)
  }

  render() {
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
}
