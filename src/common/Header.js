import React from 'react'
import styled from 'styled-components'
import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { MdAdd } from 'react-icons/md'

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1a1a1a;
  padding: 0 10px 0 10px;
  z-index: 1;
`
const StyledLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  height: 24px;
`

export default function Header() {
  return (
    <StyledHeader>
      <StyledLink to="/" style={{ position: 'absolute', left: '10px' }}>
        <img src={logo} alt="video-q" />
      </StyledLink>
      <StyledLink to="/upload">
        <MdAdd color={'#8A8A8A'} size={'28px'} />
      </StyledLink>
      <StyledLink to="/search">
        <FiSearch
          color={'#8A8A8A'}
          size={'28px'}
          style={{ position: 'absolute', right: '10px' }}
        />
      </StyledLink>
      {/* <SearchBar2 /> */}
    </StyledHeader>
  )
}
