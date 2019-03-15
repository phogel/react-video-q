import React from 'react'
import styled from 'styled-components'
import Icon from '../../common/Icon'

const IconGrid = styled.div`
  display: grid;
  grid-auto-rows: auto;
  text-align: center;
  font-size: 12px;
  user-select: none;
`

export default function ButtonLearningQueue({ status, onClick }) {
  let line1 = 'Move to'
  let line2 = 'learning queue'
  let color = '#C4C4C4'
  let shadow = 'drop-shadow( 0 1px 1px #ddd)'

  if (status === 1) {
    line1 = <strong>In learning</strong>
    line2 = <strong>queue</strong>
    color = '#EFA5D4'
    shadow = ''
  }

  return (
    <IconGrid onClick={onClick}>
      <Icon
        style={{ marginBottom: '10px', filter: shadow }}
        fill={color}
        height="45px"
        name="learning-queue"
      />
      <div>{line1}</div>
      <div>{line2}</div>
    </IconGrid>
  )
}
