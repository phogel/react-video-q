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

export default function ButtonRefreshQueue({ status, onClick }) {
  let line1 = 'Move to'
  let line2 = 'refresh queue'
  let color = '#C4C4C4'
  let shadow = 'drop-shadow( 0 1px 1px #ddd)'

  if (status === 3) {
    line1 = <strong>In refresh</strong>
    line2 = <strong>queue</strong>
    color = '#FF328B'
    shadow = ''
  }

  return (
    <IconGrid onClick={onClick}>
      <Icon
        style={{ marginBottom: '10px', filter: shadow }}
        fill={color}
        height="45px"
        name="refresh-queue"
      />
      <div>{line1}</div>
      <div>{line2}</div>
    </IconGrid>
  )
}
