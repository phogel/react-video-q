import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: auto;
  grid-gap: 6px;
  height: 50px;
  color: #fefdfd;
  margin: 6px 6px 0 6px;
  z-index: 1;
  animation: move-down 0.2s ease-out;

  @keyframes move-down {
    0% {
      transform: translateY(-15rem);
    }
    100% {
      transform: translateY(0);
    }
  }
`

const StyledItem = styled.div`
  font-size: 16px;
  text-decoration: bold;
  font-family: 'Dosis', sans-serif;
  display: flex;
  justify-content: center;
  text-align: center;
  background: #1a1a1a;
  padding: 10px;
  border-radius: 10px;
  z-index: 10;
`

export default function AddPage({ history }) {
  return (
    <Container>
      <StyledItem onClick={() => history.push('/add/id')}>
        Add by YouTube ID
      </StyledItem>
      <StyledItem onClick={() => history.push('/add/playlist')}>
        Add playlist from YouTube
      </StyledItem>
      <StyledItem onClick={() => history.push('/add/playlist')}>
        Upload to YouTube
      </StyledItem>
    </Container>
  )
}
