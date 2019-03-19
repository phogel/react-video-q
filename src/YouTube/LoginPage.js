import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Input from '../common/Input'
import PageTitleFullscreen from '../common/PageTitleFullscreen'
import Spinner from '../common/Spinner'

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

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  > a {
    text-decoration: none;
    color: #1a1a1a;
  }
  user-select: none;
`

// Options
const CLIENT_ID =
  '843342214316-febn2vufffq9heqdut8vhtlfvqjh15sd.apps.googleusercontent.com'
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
]
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly'
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
          this.setState({ initialized: true })
          // Listen for sign in state changes
          gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(isSignedIn => this.setState({ isSignedIn }))

          // Handle initial sign in state
          this.setState({
            isSignedIn: gapi.auth2.getAuthInstance().isSignedIn.get(),
          })
        })
    })

    this.state = {
      isSignedIn: false,
      initialized: false,
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

  //   // Get playlist from API
  //   getPlaylist(playlist) {
  //     console.log(playlist)
  //     gapi.client.youtube.

  //   }

  //   function get_channel(cid) {
  //     var request = gapi.client.youtube.channels.list({
  //         part: 'snippet,contentDetails,statistics',
  //         id: cid
  //     });
  //     request.execute(function(response) {
  //         var channels = response.items;
  //         console.log(channels[0].snippet.title);
  //     });
  // }

  //   defineRequest() {
  //     buildApiRequest('GET',
  //                     '/youtube/v3/playlists',
  //                     {'channelId': 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
  //                      'maxResults': '25',
  //                      'part': 'snippet,contentDetails'});
  //       }
  login() {
    console.log('login')
    gapi.auth2.getAuthInstance().signIn()
  }

  logout() {
    console.log('logout')
    gapi.auth2.getAuthInstance().signOut()
  }

  skipLogin() {
    console.log('skip login')
    // this.setState()
  }

  render() {
    const { isSignedIn, initialized } = this.state

    if (!initialized) {
      return <Spinner />
    }
    if (isSignedIn) {
      return (
        <Grid id="content">
          <PageTitleFullscreen title="Enter a play list name" />
          <StyledForm id="playlist-form">
            <Input
              id="input-field"
              name="playlist"
              placeholder="Playlist name"
            />
            <input type="submit" value="Load videos from playlist" />
          </StyledForm>
          <button id="signout-button" onClick={() => this.logout()}>
            Log Out
          </button>
          <LinkContainer>
            <Link to="/" onClick={this.skipLogin}>
              Skip
            </Link>
          </LinkContainer>
        </Grid>
      )
    }
    return (
      <Grid id="content">
        <PageTitleFullscreen title="Log in to YouTube" />
        <button id="authorize-button" onClick={() => this.login()}>
          Log In
        </button>
        <LinkContainer>
          <Link to="/" onClick={this.skipLogin}>
            Skip
          </Link>
        </LinkContainer>
      </Grid>
    )
  }
}
