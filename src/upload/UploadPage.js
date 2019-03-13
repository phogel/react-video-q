import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PageTitleFullscreen from '../common/PageTitleFullscreen'
import Form from './Form'

const Grid = styled.section`
  display: grid;
  grid-auto-rows: auto;
  width: 100%;
  margin: auto 0;
  grid-gap: 30px;
  padding: 20px;
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

export default function UploadPage({ cards, onSubmit, history }) {
  function goBack() {
    window.history.back()
  }

  return (
    <Grid>
      <PageTitleFullscreen>Upload video</PageTitleFullscreen>
      <Form cards={cards} history={history} onSubmit={onSubmit} />
      <LinkContainer>
        <Link to="" onClick={goBack}>
          Cancel
        </Link>
      </LinkContainer>
    </Grid>
  )
}
