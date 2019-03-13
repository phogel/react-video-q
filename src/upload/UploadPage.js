import React from 'react'
import { Link } from 'react-router-dom'
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
  function goBack() {
    window.history.back()
  }

  return (
    <Grid>
      <PageTitleFullscreen>Upload video</PageTitleFullscreen>
      <form className="form__group">
        <input className="form__field" type="text" placeholder="Title" />
        <input
          className="form__field"
          type="text"
          placeholder="Tags: e.g. head roll, Pablo & Raquel, 2018..."
        />
        <input className="form__field" type="text" placeholder="Video notes" />
        <input
          className="form__field"
          type="text"
          placeholder="YouTube video ID"
        />
        <button>Upload</button>
      </form>
      <Link to="" onClick={goBack}>
        Cancel
      </Link>
    </Grid>
  )
}
