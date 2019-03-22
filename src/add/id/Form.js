import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { MdCloudUpload } from 'react-icons/md'
import split from '../../utils.js'

const StyledForm = styled.form`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 20px;
  > * input {
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid #e0e0e0;
    background: none;
    ::placeholder {
      color: #9e9e9e;
      font-size: 16px;
    }
  }
`

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-top: 10px;
`

const defaultData = {
  title: '',
  tags: '',
  notes: '',
  id: '',
  status: 0,
}

export default function Form({ cards, history, onSubmit }) {
  const [data, setData] = useState(defaultData)

  function onInputChange(event) {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const input = useRef(null)

  useEffect(() => {
    input.current.focus()
  }, [])

  const [isError, setIsError] = useState(false)

  function onSubmitHandler(event) {
    event.preventDefault()
    const newArray = cards.filter(card => card.id === data.id)
    if (newArray.length !== 0) {
      setIsError(true)
    } else {
      setIsError(false)
      const tags = split(data.tags)
      const bgUrl = `http://img.youtube.com/vi/${data.id}/maxresdefault.jpg`
      onSubmit({ ...data, tags, backgroundImageUrl: bgUrl })
      history.push('/')
      setData(defaultData)
    }
  }

  function ErrorMessage() {
    if (isError) {
      return (
        <div style={{ color: '#FF328B', textAlign: 'center' }}>
          Error: A video with this ID already exists!
        </div>
      )
    }
    return null
  }

  return (
    <StyledForm onSubmit={event => onSubmitHandler(event)}>
      <div className="group">
        <input
          type="text"
          required
          placeholder="Title"
          ref={input}
          name="title"
          onChange={onInputChange}
          value={data.title}
          maxLength="50"
        />
        <span className="bar" />
      </div>
      <div className="group">
        <input
          type="text"
          placeholder="Tags: e.g. head roll, Pablo & Raquel, 2018..."
          name="tags"
          onChange={onInputChange}
          value={data.tags}
          maxLength="100"
        />
        <span className="bar" />
      </div>
      <div className="group">
        <input
          type="text"
          placeholder="Notes"
          name="notes"
          onChange={onInputChange}
          value={data.notes}
          maxLength="300"
        />
        <span className="bar" />
      </div>
      <div className="group">
        <input
          required
          type="text"
          placeholder="YouTube video ID"
          name="id"
          onChange={onInputChange}
          value={data.id}
        />
        <span className="bar" />
        <ErrorMessage />
      </div>
      <StyledButton>
        Add to VIDE-Q{' '}
        <MdCloudUpload
          color={'rgb(250, 250, 250)'}
          size={'20px'}
          style={{ marginLeft: '10px' }}
        />
      </StyledButton>
    </StyledForm>
  )
}
