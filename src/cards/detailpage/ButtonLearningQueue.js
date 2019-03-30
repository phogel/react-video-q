import React from 'react'
import styled from 'styled-components'
import Icon from '../../common/Icon'

const IconGrid = styled.div`
  display: grid;
  grid-auto-rows: auto;
  text-align: center;
  font-size: 12px;
  user-select: none;
  color: ${p => p.color};
`

export default function ButtonLearningQueue({ status, onClick }) {
  let line1 = 'Move to'
  let line2 = 'learning queue'
  let fill = '#C4C4C4'
  let shadow = 'drop-shadow( 0 1px 1px #ddd)'
  let color = 'rgba(26, 26, 26, 0.57)'

  if (status === 1) {
    line1 = <strong>In learning</strong>
    line2 = <strong>queue</strong>
    fill = '#FFBA49'
    shadow = ''
    color = '#1a1a1a'
  }

  return (
    <IconGrid onClick={onClick} color={color}>
      <Icon
        style={{ marginBottom: '10px', filter: shadow }}
        fill={fill}
        height="30px"
        name="learning-queue"
      />
      <div>{line1}</div>
      <div>{line2}</div>
    </IconGrid>
  )
}
