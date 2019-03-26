import React, { useState } from 'react'
import styled from 'styled-components'
import { MdArrowUpward } from 'react-icons/md'
import logo from '../images/logo.svg'

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
    75% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`

const AddVideoNotice = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 25px;
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

const BarBackground = styled.div`
  position: relative;
  background: #e0e0e0;
  border-radius: 15px;
`

const BarFill = styled.div`
  position: absolute;
  padding-top: 10px;
  font-size: 14px;
  bottom: 0;
  background: ${p => p.fill};
  border-radius: 15px;
  width: 100%;
  text-align: center;
  height: ${p => p.height};
  animation: move-up 3s ease-out;

  @keyframes move-up {
    0% {
      height: 0;
    }
    100% {
      height: ${p => p.height};
    }
  }
`

const Label = styled.div`
  font-size: 12px;
  text-align: center;
`

export default function Dashboard({ showLogo, setShowLogo, cards }) {
  setTimeout(() => {
    setShowLogo(false)
  }, 3500)

  const barFill = ['#2DDBE3', '#EFA5D4', '#00CCA9', '#FF328B']

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
            <BarBackground>
              <BarFill
                height={
                  (cards.filter(card => card.status === 0).length /
                    cards.length) *
                    100 +
                  '%'
                }
                fill={barFill[0]}
              >
                {cards.filter(card => card.status === 0).length}
              </BarFill>
            </BarBackground>
            <BarBackground>
              <BarFill
                height={
                  (cards.filter(card => card.status === 1).length /
                    cards.length) *
                    100 +
                  '%'
                }
                fill={barFill[1]}
              >
                {cards.filter(card => card.status === 1).length}
              </BarFill>
            </BarBackground>
            <BarBackground>
              <BarFill
                height={
                  (cards.filter(card => card.status === 2).length /
                    cards.length) *
                    100 +
                  '%'
                }
                fill={barFill[2]}
              >
                {cards.filter(card => card.status === 2).length}
              </BarFill>
            </BarBackground>
            <BarBackground>
              <BarFill
                height={
                  (cards.filter(card => card.status === 3).length /
                    cards.length) *
                    100 +
                  '%'
                }
                fill={barFill[3]}
              >
                {cards.filter(card => card.status === 3).length}
              </BarFill>
            </BarBackground>
            <Label>Not learned</Label>
            <Label>Learning queue</Label>
            <Label>Learned</Label>
            <Label>Refresh queue</Label>
          </Statistics>
        </StatisticsContainer>
      ) : (
        <AddVideoNotice>
          <MdArrowUpward color="" size="30px" />
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            There are no videos in your VIDE<strong>Q</strong> yet. <br />
            Start by adding some now.
          </div>
        </AddVideoNotice>
      )}
    </React.Fragment>
  )
}
