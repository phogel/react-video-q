import React, { useState } from 'react'
import styled from 'styled-components'
import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { MdAdd } from 'react-icons/md'
import AddPage from '../add/AddPage'

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

const StyledAddButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  &:focus {
    outline: none;
  }
  height: 24px;
`

export default function Header({ history }) {
  const [addClick, setAddClick] = useState(false)

  function onClickHandler() {
    setAddClick(!addClick)
  }

  function AddPageComponent() {
    if (addClick) {
      return <AddPage history={history} />
    }
    return null
  }

  function Modal() {}

  return (
    <Container>
      <StyledHeader>
        <StyledLink to="/" style={{ position: 'absolute', left: '10px' }}>
          <img src={logo} alt="video-q" style={{ userSelect: 'none' }} />
        </StyledLink>
        <StyledAddButton onClick={onClickHandler}>
          <MdAdd color="#8A8A8A" size="30px" />
        </StyledAddButton>
        <StyledLink to="/search">
          <FiSearch
            color="#8A8A8A"
            size="24px"
            style={{ position: 'absolute', right: '10px' }}
          />
        </StyledLink>
      </StyledHeader>
      <AddPageComponent />
    </Container>
  )
}
