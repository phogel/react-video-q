import React from 'react'
import styled from 'styled-components'
import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1a1a1a;
  padding: 0 10px 0 10px;
`
const StyledLink = styled(Link)`
  user-select: none;
  height: 24px;
`

export default function Header({ cards }) {
  return (
    <StyledHeader>
      <StyledLink to="/">
        <img src={logo} alt="video-q" />
      </StyledLink>
      <StyledLink to="/search">
        <FiSearch color={'#8A8A8A'} size={'28px'} />
      </StyledLink>
    </StyledHeader>
  )
}
