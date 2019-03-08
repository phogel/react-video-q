import React from 'react'
import styled from 'styled-components'
import logo from '../images/logo.svg'
import { BrowserRouter as Route, Router, Link } from 'react-router-dom'

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

export default function Header() {
  return (
    <StyledHeader>
      <StyledLink exact to="/">
        <img src={logo} alt="video-q" />
      </StyledLink>
    </StyledHeader>
  )
}
