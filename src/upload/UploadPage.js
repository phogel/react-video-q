import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PageTitleFullscreen from '../common/PageTitleFullscreen'
import Form from './Form'
import split from '../utils.js'

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
`

const defaultData = {
  title: '',
  tags: '',
  notes: '',
  id: '',
  status: 0,
}

export default function UploadPage(props) {
  const [data, setData] = useState(defaultData)

  function onInputChange(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  function onSubmit(event) {
    event.preventDefault()
    props.history.push('/')
    const tags = split(data.tags)
    props.onSubmit({ ...data, tags })
    setData(defaultData)
  }

  function goBack() {
    window.history.back()
  }

  return (
    <Grid>
      <PageTitleFullscreen>Upload video</PageTitleFullscreen>
      <Form data={data} onSubmit={onSubmit} onInputChange={onInputChange} />
      <LinkContainer>
        <Link to="" onClick={goBack}>
          Cancel
        </Link>
      </LinkContainer>
    </Grid>
  )
}
