import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { MdAdd, MdInsertChart } from 'react-icons/md'
import AddPage from '../add/AddPage'
import Dashboard from '../dashboard/Dashboard'

const Container = styled.section`
  display: grid;
`

const StyledHeader = styled.header`
  display: flex;
  height: 48px;
  justify-content: center;
  align-items: center;
  background: #1a1a1a;
  padding: 0 10px 0 10px;
  z-index: 2;
  position: relative;
  & > {
    display: flex;
    justify-content: space-between;
    align-items: center;
    user-select: none;
    &:focus {
      outline: none;
    }
    height: 24px;
  }
`

const StyledLogo = styled(Link)`
  position: absolute;
  left: 10px;
`

const StyledAddIcon = styled.div`
  position: absolute;
  right: 50%;
  transform: translateX(50%);

  @keyframes rotation {
    0% {
      transform: rotate(0deg) translateX(50%);
    }
    100% {
      transform: rotate(45deg) translateY(-29%) translateX(35%);
    }
  }
`

const StyledDashboardIcon = styled.div`
  position: absolute;
  right: 12%;
`

const StyledSearchLink = styled(Link)`
  position: absolute;
  right: 10px;
`

export default function Header({ history, cards }) {
  const [addClick, setAddClick] = useState(false)
  const [dashboardClick, setDashboardClick] = useState(false)

  function onAddClickHandler() {
    setAddClick(!addClick)
    if (dashboardClick === true) {
      setDashboardClick(false)
    }
  }

  function onDashboardClickHandler() {
    setDashboardClick(!dashboardClick)
    if (addClick === true) {
      setAddClick(false)
    }
  }

  function AddPageComponent() {
    if (addClick) {
      return <AddPage history={history} setAddClick={setAddClick} />
    }
    return null
  }

  function DashboardComponent() {
    if (dashboardClick) {
      return <Dashboard cards={cards} setDashboardClick={setDashboardClick} />
    }
    return null
  }

  return (
    <Container>
      <StyledHeader>
        <StyledLogo to="/">
          <img src={logo} alt="VIDEQ" style={{ userSelect: 'none' }} />
        </StyledLogo>
        <StyledAddIcon style={addClick ? {animation: 'rotation 0.8s forwards cubic-bezier(0.4, 0, 0.2, 1)'} : null } onClick={onAddClickHandler}>
          <MdAdd color={addClick ? '#FF328B' : '#fefdfd'} size="30px" />
        </StyledAddIcon>
        <StyledDashboardIcon onClick={onDashboardClickHandler}>
          <MdInsertChart
            color={dashboardClick ? '#FF328B' : '#fefdfd'}
            size="30px"
          />
        </StyledDashboardIcon>
        <StyledSearchLink to="/search">
          <FiSearch color="#fefdfd" size="24px" />
        </StyledSearchLink>
      </StyledHeader>
      <AddPageComponent />
      <DashboardComponent />
    </Container>
  )
}
