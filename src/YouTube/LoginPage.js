import React, { Component } from 'react'
import styled from 'styled-components'
import Input from '../common/Input'

const Grid = styled.section`
  display: grid;
  grid-auto-rows: auto;
  width: 100%;
  margin: auto 0;
  grid-gap: 20px;
  padding: 20px;
`

const StyledForm = styled.form`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 20px;
`

// Options
const CLIENT_ID =
  '843342214316-febn2vufffq9heqdut8vhtlfvqjh15sd.apps.googleusercontent.com'
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
]
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly'
const defaultChannel = 'techguyweb'
const gapi = window.gapi

export default class LoginPage extends Component {
  constructor(props) {
    super(props)

    gapi.load('client:auth2', () => {
      gapi.client
        .init({
          discoveryDocs: DISCOVERY_DOCS,
          clientId: CLIENT_ID,
          scope: SCOPES,
        })
        .then(() => {
          // Listen for sign in state changes
          gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(this.updateSigninStatus)
          // Handle initial sign in state
          this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())
        })
    })

    this.state = {
      isSignedIn: false,
    }
  }

  // Update UI sign in state changes
  updateSigninStatus(isSignedIn) {
    console.log('state: ' + isSignedIn)
    this.setState({ isSignedIn })
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

  login() {
    console.log('login')
    gapi.auth2.getAuthInstance().signIn()
  }

  logout() {
    console.log('logout')
    gapi.auth2.getAuthInstance().signOut()
  }

  render() {
    const { isSignedIn } = this.state

    if (isSignedIn) {
      return (
        <Grid id="content">
          <StyledForm id="playlist-form">
            <Input
              id="input-field"
              name="playlist"
              placeholder="Enter a playlist name"
            />
            <input type="submit" value="Load videos from playlist" />
          </StyledForm>
          <button id="signout-button" onClick={() => this.logout()}>
            Log Out
          </button>
        </Grid>
      )
    }
    return (
      <Grid id="content">
        Log In To YouTube
        <button id="authorize-button" onClick={() => this.login()}>
          Log In
        </button>
      </Grid>
    )
  }
}
