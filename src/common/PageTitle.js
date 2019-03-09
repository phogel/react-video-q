import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.div`
  width: 100%;
  font-size: 15px;
  text-decoration: bold;
  font-family: 'Dosis', sans-serif;
  display: flex;
  justify-content: center;
`

function bgColor(status) {
  if (status === 1) {
    return { background: '#EFA5D4' }
  } else if (status === 2) {
    return { background: '#00CCA9' }
  } else if (status === 3) {
    return { background: '#FF328B' }
  } else return { background: '#2DDBE3' }
}

export default function PageTitle({ name, status }) {
  return <StyledTitle style={bgColor(status)}>{name}</StyledTitle>
}