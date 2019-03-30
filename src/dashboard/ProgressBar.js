import React from 'react'
import styled from 'styled-components'

const ProgressBarBackground = styled.div`
  position: relative;
  border-radius: 15px;
`

const ProgressBarFill = styled.div`
  position: absolute;
  padding-top: 5px;
  font-size: 14px;
  color: #fefefe;
  font-weight: bold;
  bottom: 0;
  background: ${p => p.fill};
  border-radius: 15px;
  width: 100%;
  min-height: 22px;
  text-align: center;
  height: ${p => p.height};
`

export default function ProgressBar({ cards, status }) {
  const progressBarFill = ['#2DDBE3', '#FFBA49', '#00CCA9', '#FF328B']
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
