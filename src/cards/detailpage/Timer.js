import React, { useState } from 'react'
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

export default function Timer({ card, setGo, onTimerChange }) {
  const [start, setStart] = useState(card.startSeconds)
  const [end, setEnd] = useState(card.endSeconds)

  function onGoClick() {
    setGo(true)
    onTimerChange(card, start, end)
    onTimerChange(card, start, end)
  }

  function onStartChangeHandler(event) {
    setStart(event.target.value)
    onTimerChange(card, start, end)
  }

  function onEndChangeHandler(event) {
    setEnd(event.target.value)
    onTimerChange(card, start, end)
  }

  return (
    <StyledForm>
      <FaStopwatch color={'rgba(26, 26, 26, 0.57)'} size={'20px'} />
      Practice from
      <StyledInput
        name="startSeconds"
        type="number"
        value={start}
        onChange={event => onStartChangeHandler(event)}
      />
      to
      <StyledInput
        name="endSeconds"
        type="number"
        value={end}
        onChange={event => onEndChangeHandler(event)}
      />
      seconds
      <StyledButton onClick={onGoClick}>GO</StyledButton>
    </StyledForm>
  )
}
