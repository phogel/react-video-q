import React from 'react'
import styled from 'styled-components'
import { MdRemoveRedEye } from 'react-icons/md'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const Container = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  font-size: 14px;
  color: rgba(26, 26, 26, 0.57);
`

export default function LastSeen({ card }) {
  return (
    <Container>
      <MdRemoveRedEye
        color={'rgba(26, 26, 26, 0.57)'}
        size={'20px'}
        style={{ marginRight: '4px' }}
      />
      {dayjs().to(card.lastSeenTime)}
    </Container>
  )
}
