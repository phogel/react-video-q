import React from 'react'
import styled from 'styled-components'

const ProgressBarBackground = styled.div`
  position: relative;
  border-radius: 15px;
`

const ProgressBarFill = styled.div`
  position: absolute;
  padding-top: ${p=>p.paddingTop};
  font-size: 14px;
  color: #fefefe;
  font-weight: bold;
  bottom: 0;
  background: ${p => p.fill};
  border-radius: 15px;
  width: 100%;
  min-height: 14px;
  text-align: center;
  height: ${p => p.height};
  animation: 'fill-bar${p => p.name}' 2s ease-out;

  @keyframes 'fill-bar${p => p.name}' {
    0% {
      height: 0;
      padding-top: 0;
    }
    20% {
      height: 0;
      padding-top: 0;
    }
    60% {
      padding-top: 0;
    }
    100% {
      height: ${p => p.height};
      padding-top: ${p=>p.paddingTop};
    }
  }
`

export default function ProgressBar({ cards, status }) {

  function paddingTop() {
    if (cards.filter(card => card.status === status).length > 1) {
      return '8px'
    } else {
      return '0px'
    }
  }
  const progressBarFill = ['#2DDBE3', '#FFBA49 ', '#00CCA9', '#FF328B']
  return (
    <ProgressBarBackground>
      <ProgressBarFill
        name={status}
        paddingTop={paddingTop}
        height={
          (cards.filter(card => card.status === status).length / cards.length) *
            100 +
          '%'
        }
        fill={progressBarFill[status]}
      >
        {cards.filter(card => card.status === status).length}
      </ProgressBarFill>
    </ProgressBarBackground>
  )
}
