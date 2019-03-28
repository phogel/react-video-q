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
`
const StyledLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  &:focus {
    outline: none;
  }
  height: 24px;
`

const StyledIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  &:focus {
    outline: none;
  }
  height: 24px;
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
        <StyledLink to="/" style={{ position: 'absolute', left: '10px' }}>
          <img src={logo} alt="VIDEQ" style={{ userSelect: 'none' }} />
        </StyledLink>
        <StyledIcon
          onClick={onAddClickHandler}
          style={{
            position: 'absolute',
            right: '50%',
            transform: 'translateX(50%)',
          }}
        >
          <MdAdd color={addClick ? '#FF328B' : '#fefdfd'} size="30px" />
        </StyledIcon>
        <StyledIcon
          onClick={onDashboardClickHandler}
          style={{
            position: 'absolute',
            right: '12%',
          }}
        >
          <MdInsertChart
            color={dashboardClick ? '#FF328B' : '#fefdfd'}
            size="30px"
          />
        </StyledIcon>
        <StyledLink
          to="/search"
          style={{ position: 'absolute', right: '10px' }}
        >
          <FiSearch color="#fefdfd" size="24px" />
        </StyledLink>
      </StyledHeader>
      <AddPageComponent />
      <DashboardComponent />
    </Container>
  )
}
