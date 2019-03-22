import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Icon from './Icon'

const StyledNav = styled.nav`
  display: grid;
  grid-auto-flow: column;
  background: #1a1a1a;
`

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  transition: all 0.5s ease-in;
`

export default function Nav({ status }) {
  return (
    <StyledNav>
      <StyledLink to="/">
        <Icon
          fill={status === 0 ? '#2DDBE3' : '#8A8A8A'}
          height="25px"
          name="not-learned"
        />
      </StyledLink>
      <StyledLink to="/learningqueue">
        <Icon
          fill={status === 1 ? '#EFA5D4' : '#8A8A8A'}
          height="25px"
          name="learning-queue"
        />
      </StyledLink>
      <StyledLink to="/learned">
        <Icon
          fill={status === 2 ? '#00CCA9' : '#8A8A8A'}
          height="25px"
          name="learned"
        />
      </StyledLink>
      <StyledLink to="/refreshqueue">
        <Icon
          fill={status === 3 ? '#FF328B' : '#8A8A8A'}
          height="25px"
          name="refresh-queue"
        />
      </StyledLink>
    </StyledNav>
  )
}
