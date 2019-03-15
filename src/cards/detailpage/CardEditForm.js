import React, { useState } from 'react'
import styled from 'styled-components'
import { MdSave } from 'react-icons/md'
import split from '../../utils.js'

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
`

const Cancel = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  > a {
    text-decoration: none;
    color: #1a1a1a;
  }
  user-select: none;
`

export default function CardForm({ card, onSubmit }) {
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
    // setIsEditable(false)
  }

  return (
    <form onSubmit={event => onSubmitHandler(event)}>
      <TitleInput
        required
        key="title"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={onInputChange}
        maxLength="50"
      />
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
      <StyledTextArea
        key="notes"
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={onInputChange}
        maxLength="300"
      />
      <StyledButton>
        Save
        <MdSave
          color={'#FF328B'}
          size={'28px'}
          style={{ position: 'absolute', left: '60%' }}
        />
      </StyledButton>
      {/* <Cancel onClick={setIsEditable(false)}>
          Cancel
      </Cancel> */}
    </form>
  )
}
