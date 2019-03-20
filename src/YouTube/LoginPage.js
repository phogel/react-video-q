import React, { Component } from 'react'
import styled from 'styled-components'
import { Redirect, Link } from 'react-router-dom'
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
      skipLogin: false,
    }
  }

  login() {
    gapi.auth2.getAuthInstance().signIn()
  }

  logout() {
    gapi.auth2.getAuthInstance().signOut()
  }

  onSkipClickHandler() {
    this.setState({ skipLogin: true })
  }

  // getChannel() {
  //   gapi.client.youtube.channels
  //     .list({
  //       part: 'snippet,contentDetails,statistics',
  //       forUsername: 'GoogleDevelopers',
  //     })
  //     .then(function(response) {
  //       const channel = response.result.items[0]
  //       return this.createChannelInfo
  //     })
  // }

  // createChannelInfo() {
  //   return
  // }

  render() {
    const { isSignedIn, initialized, skipLogin } = this.state

    if (skipLogin) {
      return <Redirect to={{ pathname: '/' }}> </Redirect>
    }
    if (!initialized) {
      return <Spinner />
    }
    if (isSignedIn) {
      // this.getChannel()
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
          <LinkContainer onClick={() => this.onSkipClickHandler()}>
            Skip
          </LinkContainer>
          <div id="content" />
        </Grid>
      )
    }
    return (
      <Grid id="content">
        <PageTitleFullscreen title="Log in to YouTube" />
        <button id="authorize-button" onClick={() => this.login()}>
          Log In
        </button>
        <LinkContainer onClick={() => this.onSkipClickHandler()}>
          Skip
        </LinkContainer>
      </Grid>
    )
  }
}
