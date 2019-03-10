import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.div`
  width: 100%;
  font-size: 15px;
  text-decoration: bold;
  font-family: 'Dosis', sans-serif;
  display: flex;
  justify-content: center;
  /* animation: move-down 0.7s;

  @keyframes move-down {
    0% {
      transform: translateY(-3rem);
    }
    100% {
      transform: translateY(0);
    }
  } */
`

function bgColor(status) {
  if (status === 0) {
    return { background: '#2DDBE3' }
  } else if (status === 1) {
    return { background: '#EFA5D4' }
  } else if (status === 2) {
    return { background: '#00CCA9' }
  } else if (status === 3) {
    return { background: '#FF328B' }
  } else return { background: '#8A8A8A' }
}

export default function PageTitle({ title, status }) {
  return <StyledTitle style={bgColor(status)}>{title}</StyledTitle>
}
