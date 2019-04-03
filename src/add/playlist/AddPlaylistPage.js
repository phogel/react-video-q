import React, { useState } from 'react'
import styled from 'styled-components'
import PageTitleFullscreen from '../../common/PageTitleFullscreen'
import Spinner from '../../common/Spinner'
import ChannelSelect from './ChannelSelect'
import PlaylistSelect from './PlaylistSelect'
import PlaylistCards from './PlaylistCards'
import BackButton from '../../common/BackButton'

const Grid = styled.section`
  display: grid;
  grid-auto-rows: auto;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  grid-gap: 10px;
`

const Container = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 20px;
  padding: 20px 37px 0 37px;
  position: sticky;
  top: 0;
  left: 0;
  margin: auto 0;
  z-index: 5;
  background: rgb(250, 250, 250);
`

const StyledAbortLink = styled.div`
  display: flex;
  justify-content: center;
  color: #dcdcdc;
  margin-top: 10px;
`

const Error = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`

const CLIENT_ID =
  '843342214316-febn2vufffq9heqdut8vhtlfvqjh15sd.apps.googleusercontent.com'
const DISCOVERY_DOCS = [
  'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest',
]
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly'
const gapi = window.gapi

export default function AddPlaylistPage({ history, cards, setCards }) {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const [playlistItems, setPlaylistItems] = useState([])

  try {
    gapi.load('client:auth2', () => {
      gapi.client
        .init({
          discoveryDocs: DISCOVERY_DOCS,
          clientId: CLIENT_ID,
          scope: SCOPES,
        })
        .then(() => {
          setInitialized(true)
          gapi.auth2.getAuthInstance().isSignedIn.listen(isSignedIn => {
            onSigninStateChange(isSignedIn)
          })
          setIsSignedIn(gapi.auth2.getAuthInstance().isSignedIn.get())
        })
    })
  } catch (error) {
    return (
      <Error>
        <BackButton />
        <h1>Uh oh...</h1>
        <br />
        Error while connecting to YouTube. <br />
        Check your internet connection.
      </Error>
    )
  }

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
    setCards([...cards, ...playlistItems])
    history.push('/')
  }

  if (!initialized) {
    return <Spinner />
  }

  if (isSignedIn) {
    return (
      <Grid>
        <Container>
          <ChannelSelect />
          <PlaylistSelect
            setPlaylistItems={setPlaylistItems}
            onSubmit={onSubmitPlaylist}
            logout={logout}
          />
        </Container>
        <StyledAbortLink onClick={() => history.push('/')}>
          Cancel
        </StyledAbortLink>
        <PlaylistCards playlistItems={playlistItems} />
      </Grid>
    )
  }
  return (
    <Grid>
      <Container>
        <PageTitleFullscreen title="Log in to YouTube" />
        <button onClick={() => login()}>Log In</button>
        <StyledAbortLink onClick={() => history.push('/')}>
          Cancel
        </StyledAbortLink>
      </Container>
    </Grid>
  )
}
