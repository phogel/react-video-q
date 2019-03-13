import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { MdCloudUpload } from 'react-icons/md'

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

const ErrorMessage = styled.div`
  color: red;
`

export default function Form({ data, onSubmit, onInputChange }) {
  const input = useRef(null)

  useEffect(() => {
    input.current.focus()
  }, [])

  return (
    <StyledForm onSubmit={onSubmit}>
      <div className="group">
        <input
          type="text"
          required
          placeholder="Title"
          ref={input}
          name="title"
          onChange={onInputChange}
          value={data.title}
          maxlength="50"
        />
        <span className="bar" />
        <ErrorMessage />
      </div>
      <div className="group">
        <input
          required
          type="text"
          placeholder="Tags: e.g. head roll, Pablo & Raquel, 2018..."
          name="tags"
          onChange={onInputChange}
          value={data.tags}
          maxlength="100"
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
          maxlength="300"
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
  )
}
