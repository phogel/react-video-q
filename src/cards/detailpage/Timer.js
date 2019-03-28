import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FaStopwatch } from 'react-icons/fa'

const StyledForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: rgba(26, 26, 26, 0.57);
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
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

export default function Timer({ card, cards, setCards, setGo }) {
  const [startTime, setStartTime] = useState(card.startSeconds)
  const [endTime, setEndTime] = useState(card.endSeconds)
  // const [goQueue, setGoQueue] = useState(false)

  useEffect(() => {
    // setGoQueue(false)
    setStartTime(card.startSeconds)
    setEndTime(card.endSeconds)
  }, [card])

  function onStartInputChange(event) {
    setStartTime(event.target.value)
  }

  function onEndInputChange(event) {
    setEndTime(event.target.value)
  }

  function onGoClick() {
    setGo(true)
    const index = cards.indexOf(card)
    setCards([
      ...cards.slice(0, index),
      {
        ...card,
        startSeconds: startTime,
        endSeconds: endTime,
      },
      ...cards.slice(index + 1),
    ])
    // setGoQueue(true)
  }

  return (
    <StyledForm>
      <FaStopwatch color={'rgba(26, 26, 26, 0.57)'} size={'20px'} />
      Practice from
      <StyledInput
        name="startSeconds"
        type="number"
        onChange={onStartInputChange}
        value={startTime}
      />
      to
      <StyledInput
        name="endSeconds"
        type="number"
        onChange={onEndInputChange}
        value={endTime}
      />
      seconds
      <StyledButton onClick={onGoClick}>GO</StyledButton>
    </StyledForm>
  )
}
