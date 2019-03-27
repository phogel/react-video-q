import React from 'react'
import styled from 'styled-components'
import ProgressBar from './ProgressBar'

const Container = styled.div`
  display: grid;
  grid-template-rows: 60px 4fr;
  height: 100%;
  width: auto;
  grid-gap: 6px;
  color: #fefdfd;
  margin: 6px 6px 0 6px;
  z-index: 1;
  animation: move-down 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes move-down {
    0% {
      transform: translateY(-80px);
    }
    100% {
      transform: translateY(0);
    }
  }
`

const StyledItem = styled.div`
  font-size: 16px;
  font-family: 'Dosis', sans-serif;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  background: #1a1a1a;
  padding: 10px;
  border-radius: 10px;
  z-index: 10;
  transition: background-color 0.3s;
  :hover,
  :focus {
    background-color: rgb(255, 50, 139, 0.9);
    outline: 0;
  }
`

const Modal = styled.div`
  background: rgba(0, 0, 0, 0.8);
  height: calc(100vh - 48px);
  overflow: hidden;
  width: 100vw;
  z-index: 1;
  animation: fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
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

export default function Dashboard({ setDashboardClick, cards }) {
  function setAddClickHandler() {
    setDashboardClick(false)
  }
  return (
    <Modal onClick={setAddClickHandler}>
      <Container>
        <StyledItem>Your progress</StyledItem>
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
      </Container>
    </Modal>
  )
}
