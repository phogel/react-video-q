import React from 'react'
import styled from 'styled-components'
import Icon from '../common/Icon'

const IconGrid = styled.div`
  display: grid;
  grid-auto-rows: auto;
  text-align: center;
  font-size: 12px;
`

export default function ButtonLearned({ status, onClick }) {
  let line1 = 'Mark as'
  let line2 = 'learned'
  let color = '#C4C4C4'

  if (status === 2) {
    line1 = <strong>Learned</strong>
    line2 = ''
    color = '#00CCA9'
  }

  return (
    <IconGrid onClick={onClick}>
      <Icon
        style={{ marginBottom: '10px' }}
        fill={color}
        height="45px"
        name="learned"
      />
      <div>{line1}</div>
      <div>{line2}</div>
    </IconGrid>
  )
}
