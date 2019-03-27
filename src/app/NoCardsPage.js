import React from 'react'
import styled from 'styled-components'
import { MdArrowUpward } from 'react-icons/md'

const AddVideoNoticeContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 25px;
`

const UpArrow = styled.div`
  animation: move-up 2s ease-out infinite;

  @keyframes move-up {
    0% {
      transform: translateY(0px);
      opacity: 1;
    }
    40% {
      opacity: 1;
    }
    100% {
      transform: translateY(-40px);
      opacity: 0;
    }
  }
`

const AddVideoNotice = styled.div`
  padding: 20px;
  border-radius: 20px;
  background: #1a1a1a;
  color: rgb(250, 250, 250);
  margin-top: 10px;
  text-align: center;
`

export default function Dashboard() {
  return (
    <AddVideoNoticeContainer>
      <UpArrow>
        <MdArrowUpward size="30px" />
      </UpArrow>
      <AddVideoNotice>
        There are no videos in your VIDE
        <span style={{ color: '#FF328B', fontWeight: 'bold' }}>
          Q
        </span> yet. <br />
        Start by adding some now.
      </AddVideoNotice>
    </AddVideoNoticeContainer>
  )
}
