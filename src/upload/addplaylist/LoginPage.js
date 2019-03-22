import React, { useState } from 'react'
import styled from 'styled-components'
import PageTitleFullscreen from '../../common/PageTitleFullscreen'
import Spinner from '../../common/Spinner'
import ChannelSelect from './ChannelSelect'
import PlaylistSelect from './PlaylistSelect'
import PlaylistCards from './PlaylistCards'

const Grid = styled.section`
  display: grid;
  grid-auto-rows: auto;
  width: 100%;
  margin: auto 0;
  grid-gap: 20px;
  padding: 20px;
`

const StyledAbortLink = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  color: #dcdcdc;
`

const CLIENT_ID =
  '843342214316-febn2vufffq9heqdut8vhtlfvqjh15sd.apps.googleusercontent.com'
// const CLIENT_ID =
//   '362023861090-is752sg2d40q908ejsd5k9g7f387uinl.apps.googleusercontent.com'
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
]
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly'
const gapi = window.gapi

export default function LoginPage({ history }) {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [playlistItems, setPlaylistItems] = useState([])

  gapi.load('client:auth2', () => {
    gapi.client
      .init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES,
      })
      .then(() => {
        setInitialized(true)

        // Listen for sign in state changes
        gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => {
          onSigninStateChange(isSignedIn)
        })
        // Handle initial sign in state
        setIsSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get())
      })
  })

  function onSigninStateChange(isSignedIn) {
    setIsSignedIn({ isSignedIn })
  }

  function login() {
    gapi.auth2.getAuthInstance().signIn()
  }

  function logout() {
    gapi.auth2.getAuthInstance().signOut()
  }

  function onSubmitPlaylist() {
    // this.setState({ loadPlaylist: true })
  }

  if (!initialized) {
    return <Spinner />
  }

  if (isSignedIn) {
    console.log(playlistItems)
    return (
      <Grid>
        <ChannelSelect />
        <PlaylistSelect
          setPlaylistItems={setPlaylistItems}
          onSubmit={onSubmitPlaylist}
        />
        <button onClick={() => logout()}>Log Out</button>
        <StyledAbortLink onClick={() => history.push('/')}>
          Cancel
        </StyledAbortLink>
        <PlaylistCards playlistItems={playlistItems} />
      </Grid>
    )
  }
  return (
    <Grid>
      <PageTitleFullscreen title="Log in to YouTube" />
      <button onClick={() => login()}>Log In</button>
      <StyledAbortLink onClick={() => history.push('/')}>
        Cancel
      </StyledAbortLink>
    </Grid>
  )
}
