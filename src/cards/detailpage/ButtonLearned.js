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

export default function ButtonLearned({ status, onClick }) {
  let line1 = 'Mark as'
  let line2 = 'learned'
  let color = '#C4C4C4'
  let shadow = 'drop-shadow( 0 1px 1px #ddd)'

  if (status === 2) {
    line1 = <strong>Learned</strong>
    line2 = ''
    color = '#00CCA9'
    shadow = ''
  }

  return (
    <IconGrid onClick={onClick}>
      <Icon
        style={{
          marginBottom: '10px',
          filter: shadow,
        }}
        fill={color}
        height="30px"
        name="learned"
      />
      <div>{line1}</div>
      <div>{line2}</div>
    </IconGrid>
  )
}
