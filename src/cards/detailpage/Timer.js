import React, { useState } from 'react'
import styled from 'styled-components'
import { FaStopwatch } from 'react-icons/fa'
import {
  MdPlayCircleFilled,
  MdPauseCircleFilled,
  // MdRepeat,
} from 'react-icons/md'

const StyledForm = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: rgba(26, 26, 26, 0.57);
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  margin: 0 30px 0 30px;
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
  width: auto;
`

export default function Timer({
  card,
  setGo,
  onStartSecondsChange,
  onEndSecondsChange,
  isLoop,
  setIsLoop,
}) {
  const [start, setStart] = useState(card.startSeconds)
  const [end, setEnd] = useState(card.endSeconds)
  const [playing, setPlaying] = useState(false)

  function onGoClick() {
    setPlaying(!playing)
    setGo(true)
  }

  function onLoopClick() {
    console.log('loop clicked. status: ' + isLoop)
    setIsLoop(!isLoop)
  }

  function onStartChangeHandler(event) {
    setStart(event.target.value)
    onStartSecondsChange(card, event.target.value)
  }

  function onEndChangeHandler(event) {
    setEnd(event.target.value)
    onEndSecondsChange(card, event.target.value)
  }

  return (
    <StyledForm>
      <FaStopwatch color={'rgba(26, 26, 26, 0.57)'} size={'20px'} />
      Play from
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
      sec's
      <StyledButton onClick={() => onGoClick()}>
        {playing ? (
          <MdPauseCircleFilled color={'rgba(26, 26, 26, 0.57)'} size={'20px'} />
        ) : (
          <MdPlayCircleFilled color={'rgba(26, 26, 26, 0.57)'} size={'20px'} />
        )}
      </StyledButton>
      <StyledButton onClick={() => onLoopClick()}>
        {isLoop
          ? // <MdRepeat onClick={() => onLoopClick()} color="#FF328B" size="20px" />
            'UNLOOP'
          : 'LOOP'
        // <MdRepeat
        //   onClick={() => onLoopClick()}
        //   color="rgba(26, 26, 26, 0.57)"
        //   size="20px"
        // />
        }
      </StyledButton>
    </StyledForm>
  )
}
