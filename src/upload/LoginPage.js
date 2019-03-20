import React, { Component } from 'react'
import styled from 'styled-components'
import PageTitleFullscreen from '../common/PageTitleFullscreen'
import Spinner from '../common/Spinner'
import ChannelComponent from './Channel'
import PlaylistComponent from './Playlist'

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

const StyledAbortLink = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  color: #dcdcdc;
`

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
          gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => {
            this.onSigninStateChange(isSignedIn)
          })

          // Handle initial sign in state
          this.setState({
            isSignedIn: gapi.auth2.getAuthInstance().isSignedIn.get(),
          })
        })
    })

    this.onSigninStateChange = this.onSigninStateChange.bind(this)

    this.state = {
      isSignedIn: false,
      initialized: false,
    }
  }

  onSigninStateChange(isSignedIn) {
    this.setState({ isSignedIn })
  }

  login() {
    gapi.auth2.getAuthInstance().signIn()
  }

  logout() {
    gapi.auth2.getAuthInstance().signOut()
  }

  componentDidMount() {
    console.log('i mounted')
  }
  componentDidUpdate() {
    console.log('i updated')
  }
  componentWillUpdate() {
    console.log('i will update')
  }

  componentWillUnmount() {
    console.log('i will unmount')
  }
  render() {
    const { isSignedIn, initialized } = this.state

    if (!initialized) {
      return <Spinner />
    }

    if (isSignedIn) {
      return (
        <Grid id="content">
          <ChannelComponent />
          <PlaylistComponent />
          <button onClick={() => this.logout()}>Log Out</button>
          <StyledAbortLink onClick={() => this.props.history.push('/')}>
            Cancel
          </StyledAbortLink>
          <div id="content" />
        </Grid>
      )
    }
    return (
      <Grid>
        <PageTitleFullscreen title="Log in to YouTube" />
        <button onClick={() => this.login()}>Log In</button>
        <StyledAbortLink onClick={() => this.props.history.push('/')}>
          Cancel
        </StyledAbortLink>
      </Grid>
    )
  }
}
