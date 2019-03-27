import React, { useState } from 'react'
import styled from 'styled-components'
import { MdArrowUpward } from 'react-icons/md'
import logo from '../images/logo.svg'
import ProgressBar from './ProgressBar'

const WelcomeLogo = styled.section`
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #1a1a1a;
  display: flex;
  align-content: center;
  justify-content: center;
  z-index: 20;
  animation: fade-out 1.5s normal ease-out;
  animation-fill-mode: forwards;
  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    60% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`

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

const StatisticsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Statistics = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 40px);
  grid-template-rows: 1fr auto;
  grid-gap: 30px;
  margin: 0 auto;
  height: 60%;
`

const Label = styled.div`
  font-size: 12px;
  text-align: center;
`

export default function Dashboard({ showLogo, setShowLogo, cards }) {
  setTimeout(() => {
    setShowLogo(false)
  }, 3500)

  return (
    <React.Fragment>
      {showLogo ? (
        <WelcomeLogo>
          <img src={logo} alt="VIDEQ" style={{ userSelect: 'none' }} />
        </WelcomeLogo>
      ) : null}
      {cards.length !== 0 ? (
        <StatisticsContainer>
          <Statistics>
            <ProgressBar cards={cards} status={0} />
            <ProgressBar cards={cards} status={1} />
            <ProgressBar cards={cards} status={2} />
            <ProgressBar cards={cards} status={3} />
            <Label>Not learned</Label>
            <Label>Learning queue</Label>
            <Label>Learned</Label>
            <Label>Refresh queue</Label>
          </Statistics>
        </StatisticsContainer>
      ) : (
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
      )}
    </React.Fragment>
  )
}
