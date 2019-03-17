import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { MdSave } from 'react-icons/md'
import split from '../../utils.js'

const ContentGrid = styled.div`
  display: grid;
  grid-template-rows: auto;
`

const StyledForm = styled.form`
  display: grid;
  grid-template-rows: auto auto 1fr;
  > * input,
  textarea {
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

const TitleInput = styled.input`
  display: block;
  font-size: 22px;
  font-weight: bold;
  margin-top: 0;
  font-family: 'Dosis', sans-serif;
`

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-top: 10px;
`

const StyledTextArea = styled.textarea`
  width: 100%;
  font-size: 16px;
  height: 84px;
  background: transparent;
  border: none;
`

const Cancel = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  > a {
    text-decoration: none;
    color: #1a1a1a;
  }
  user-select: none;
`

export default function CardForm({ card, onSubmit, setIsEditable }) {
  const [formData, setFormData] = useState({
    title: card.title,
    tags: card.tags,
    notes: card.notes,
  })

  function onInputChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  function onSubmitHandler(event) {
    event.preventDefault()
    const tags = split(formData.tags)
    onSubmit({ ...formData, tags }, card)
    setIsEditable(false)
  }

  const input = useRef(null)
  useEffect(() => {
    input.current.focus()
  }, [])

  return (
    <StyledForm onSubmit={event => onSubmitHandler(event)}>
      <ContentGrid>
        <div className="group">
          <TitleInput
            required
            ref={input}
            key="title"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={onInputChange}
            maxLength="50"
          />
          <span className="bar" />
        </div>
        <div className="group">
          {card.tags && (
            <input
              key="tags"
              name="tags"
              placeholder="Tags: e.g. head roll, Pablo & Raquel, 2018..."
              value={formData.tags}
              onChange={onInputChange}
              maxLength="100"
            />
          )}
          <span className="bar" />
        </div>
        <div className="group">
          <StyledTextArea
            key="notes"
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={onInputChange}
            maxLength="300"
          />
          <span className="bar" />
        </div>
      </ContentGrid>
      <StyledButton>
        Save
        <MdSave
          color={'#FF328B'}
          size={'28px'}
          style={{ position: 'absolute', left: '60%' }}
        />
      </StyledButton>
      <Cancel onClick={() => setIsEditable(false)}>Cancel</Cancel>
    </StyledForm>
  )
}
