import React, { useState } from 'react'
import styled from 'styled-components'
import { FaStopwatch } from 'react-icons/fa'

const StyledForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: rgba(26, 26, 26, 0.57);
`

const StyledInput = styled.input`
  font-size: 14px;
  color: rgba(26, 26, 26, 0.57);
  padding: 4px;
  width: 40px;
  border: none;
  border: 1px solid #e0e0e0;
  background: none;
  text-align: center;
  ::placeholder {
    color: rgba(26, 26, 26, 0.57);
    font-size: 14px;
  }
`

const StyledButton = styled.button`
  font-size: 14px;
  height: 24px;
  width: 36px;
`

export default function Timer({ card, cards, setCards, onGoClick }) {
  const [firstRenderStart, setFirstRenderStart] = useState(true)
  const [firstRenderEnd, setFirstRenderEnd] = useState(true)

  const [startSeconds, setStartSeconds] = useState('')
  const [endSeconds, setEndSeconds] = useState('')

  function onStartInputChange(event) {
    setStartSeconds(event.target.value)
    const index = cards.indexOf(card)
    setFirstRenderStart(false)
    setCards([
      ...cards.slice(0, index),
      {
        ...card,
        startSeconds: event.target.value,
      },
      ...cards.slice(index + 1),
    ])
  }

  function onEndInputChange(event) {
    setEndSeconds(event.target.value)
    const index = cards.indexOf(card)
    setFirstRenderEnd(false)
    setCards([
      ...cards.slice(0, index),
      {
        ...card,
        endSeconds: event.target.value,
      },
      ...cards.slice(index + 1),
    ])
  }

  function checkForStartSeconds() {
    if (card.startSeconds !== '') {
      return card.startSeconds
    }
  }

  function checkForEndSeconds() {
    if (card.endSeconds !== '') {
      return card.endSeconds
    }
  }

  return (
    <StyledForm>
      <FaStopwatch color={'rgba(26, 26, 26, 0.57)'} size={'20px'} />
      Practice from
      <StyledInput
        name="startSeconds"
        type="number"
        onChange={onStartInputChange}
        value={firstRenderStart ? checkForStartSeconds() : startSeconds}
      />
      to
      <StyledInput
        name="endSeconds"
        type="number"
        onChange={onEndInputChange}
        value={firstRenderEnd ? checkForEndSeconds() : endSeconds}
      />
      seconds <StyledButton onClick={onGoClick}>GO</StyledButton>
    </StyledForm>
  )
}
