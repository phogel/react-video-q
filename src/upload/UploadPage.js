import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PageTitleFullscreen from '../common/PageTitleFullscreen'
import { MdCloudUpload } from 'react-icons/md'

const Grid = styled.section`
  display: grid;
  grid-auto-rows: auto;
  width: 100%;
  margin: auto 0;
  grid-gap: 30px;
  padding: 20px;
`

const StyledForm = styled.form`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 20px;
`

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  text-decoration: none;
  color: #1a1a1a;
`

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-top: 10px;
`

export default function UploadPage() {
  const input = useRef(null)

  useEffect(() => {
    input.current.focus()
  }, [])

  function goBack() {
    window.history.back()
  }

  return (
    <Grid>
      <PageTitleFullscreen>Upload video</PageTitleFullscreen>
      <StyledForm>
        <div className="group">
          <input type="text" placeholder="Title" ref={input} />
          <span class="bar" />
        </div>
        <div className="group">
          <input
            type="text"
            placeholder="Tags: e.g. head roll, Pablo & Raquel, 2018..."
            name="tags"
          />
          <span class="bar" />
          <label htmlFor="tags">
            Tags: e.g. head roll, Pablo & Raquel, 2018...
          </label>
        </div>
        <div className="group">
          <input type="text" placeholder="Video notes" name="notes" />
          <span class="bar" />
          <label htmlFor="notes">Video notes</label>
        </div>
        <div className="group">
          <input type="text" placeholder="YouTube video ID" name="id" />
          <span class="bar" />
          <label htmlFor="id">YouTube video ID</label>
        </div>
        <StyledButton>
          Submit{' '}
          <MdCloudUpload
            color={'#FF328B'}
            size={'28px'}
            style={{ marginLeft: '10px' }}
          />
        </StyledButton>
      </StyledForm>
      <StyledLink to="" onClick={goBack}>
        Cancel
      </StyledLink>
    </Grid>
  )
}

{
  /* <StyledForm className="form__group">
        <input
          className="form__field"
          type="text"
          placeholder="Title"
          name="title"
        />
        <label htmlFor="title" className="form__label">
          Title
        </label>
        <input
          className="form__field"
          type="text"
          placeholder="Tags: e.g. head roll, Pablo & Raquel, 2018..."
          name="tags"
        />
        <label htmlFor="tags" className="form__label">
          Tags: e.g. head roll, Pablo & Raquel, 2018...
        </label>
        <input
          className="form__field"
          type="text"
          placeholder="Video notes"
          name="notes"
        />
        <label htmlFor="notes" className="form__label">
          Video notes
        </label>
        <input
          className="form__field"
          type="text"
          placeholder="YouTube video ID"
          name="id"
        />
        <label htmlFor="id" className="form__label">
          YouTube video ID
        </label>
        <StyledButton>
          Upload{' '}
          <MdCloudUpload
            color={'#FF328B'}
            size={'28px'}
            style={{ marginLeft: '10px' }}
          />
        </StyledButton>
      </StyledForm> */
}
