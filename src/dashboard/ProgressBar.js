import React from 'react'
import styled from 'styled-components'

const ProgressBarBackground = styled.div`
  position: relative;
  background: #e0e0e0;
  border-radius: 15px;
`

const ProgressBarFill = styled.div`
  position: absolute;
  padding-top: 5px;
  font-size: 14px;
  bottom: 0;
  background: ${p => p.fill};
  border-radius: 15px;
  width: 100%;
  min-height: 22px;
  text-align: center;
  height: ${p => p.height};
  /* animation: fill-bar 1s ease-out;

  @keyframes fill-bar {
    0% {
      height: 0;
    }
    100% {
      height: ${p => p.height};
    }
  } */
`

export default function ProgressBar({ cards, status }) {
  const progressBarFill = ['#2DDBE3', '#EFA5D4', '#00CCA9', '#FF328B']
  return (
    <ProgressBarBackground>
      <ProgressBarFill
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
