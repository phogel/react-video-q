import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { MdCloudUpload } from 'react-icons/md'
import split from '../utils.js'

const StyledForm = styled.form`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 20px;
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

export default function Form({ onSubmit, cards, history }) {
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

  function onSubmitHandler(event) {
    event.preventDefault()
    const newArray = cards.filter(card => card.id === data.id)
    if (newArray.length !== 0) {
      setIsError(true)
    } else {
      setIsError(false)
      const tags = split(data.tags)
      onSubmit({ ...data, tags })
      history.push('/')
      setData(defaultData)
    }
  }

  const [isError, setIsError] = useState(false)

  function ErrorMessage() {
    if (isError) {
      return (
        <div style={{ color: '#FF328B', textAlign: 'center' }}>
          Error: A video with this idea already exists!
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
          required
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
          placeholder="Video notes"
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
        <ErrorMessage />
        <span className="bar" />
      </div>
      <StyledButton>
        Submit{' '}
        <MdCloudUpload
          color={'#FF328B'}
          size={'28px'}
          style={{ position: 'absolute', left: '60%' }}
        />
      </StyledButton>
    </StyledForm>
  )
}
