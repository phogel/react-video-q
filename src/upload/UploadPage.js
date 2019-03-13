import React from 'react'
import styled from 'styled-components'
import PageTitleFullscreen from '../common/PageTitleFullscreen'

const Grid = styled.section`
  display: grid;
  grid-auto-rows: auto;
  width: 100%;
  margin: auto 0;
  grid-gap: 20px;
  padding: 20px;
`

export default function UploadPage() {
  return (
    <Grid>
      <PageTitleFullscreen>Upload video</PageTitleFullscreen>
    </Grid>
  )
}
