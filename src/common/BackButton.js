import React from 'react'
import styled from 'styled-components'
import { MdClose } from 'react-icons/md'

const StyledBackButton = styled.div`
  margin: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 8px;
  left: 8px;
  height: 28px;
  width: 28px;
  opacity: 0.75;
  background: black;
  z-index: 10;
  border-radius: 5px;
`

export default function BackButton() {
  function goBack() {
    window.history.back()
  }

  return (
    <StyledBackButton onClick={goBack}>
      <MdClose color={'#FCFCFC'} size={'24px'} />
    </StyledBackButton>
  )
}
