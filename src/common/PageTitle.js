import React from 'react'
import styled from 'styled-components'

const StyledBackground = styled.div`
  width: 100%;
  font-size: 15px;
  text-decoration: bold;
  font-family: 'Dosis', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledTitle = styled.div`
  animation: move-left-quick 0.4s ease-out;

  @keyframes move-left-quick {
    0% {
      transform: translateX(6px);
    }
    100% {
      transform: translateX(0);
    }
  }
`

function bgColor(status) {
  if (status === 0) {
    return { background: '#2DDBE3' }
  } else if (status === 1) {
    return { background: '#FFBA49 ' }
  } else if (status === 2) {
    return { background: '#00CCA9' }
  } else if (status === 3) {
    return { background: '#FF328B' }
  } else return { background: '#8A8A8A' }
}

export default function PageTitle({ title, status }) {
  return (
    <StyledBackground style={bgColor(status)}>
      <StyledTitle>{title}</StyledTitle>
    </StyledBackground>
  )
}
