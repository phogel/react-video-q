import React from 'react'
import styled from 'styled-components'
import PageTitleFullscreen from '../common/PageTitleFullscreen'
import Form from './Form'

const Grid = styled.section`
  display: grid;
  grid-auto-rows: auto;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  grid-gap: 30px;
  padding: 20px;
`

const StyledAbortLink = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  color: #dcdcdc;
`

export default function UploadPage({ cards, onSubmit, history }) {
  function goBack() {
    window.history.back()
  }

  return (
    <Grid>
      <PageTitleFullscreen title="Add video with YouTube ID" />
      <Form cards={cards} history={history} onSubmit={onSubmit} />
      <StyledAbortLink onClick={goBack}>Cancel</StyledAbortLink>
    </Grid>
  )
}
