import React from 'react'
import styled from 'styled-components'
import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'
import SearchBar from '../search/SearchBar'

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1a1a1a;
  padding-left: 10px;
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
      <SearchBar cards={cards} />
    </StyledHeader>
  )
}
