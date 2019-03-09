import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Route, Router, NavLink } from 'react-router-dom'
import Icon from './Icon'

const StyledNav = styled.nav`
  display: grid;
  grid-auto-flow: column;
`

const StyledLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1a1a1a;
  text-decoration: none;

  &.active {
    background: 'green';
  }
`

export default function Nav({ status }) {
  return (
    <StyledNav>
      <StyledLink exact to="/">
        <Icon
          style={{}}
          fill={status === 0 ? '#2DDBE3' : '#8A8A8A'}
          height="25px"
          name="not-learned"
        />
      </StyledLink>
      <StyledLink to="/learningqueue">
        <Icon
          style={{}}
          fill={status === 1 ? '#EFA5D4' : '#8A8A8A'}
          height="25px"
          name="learning-queue"
        />
      </StyledLink>
      <StyledLink to="/learned">
        <Icon
          style={{}}
          fill={status === 2 ? '#00CCA9' : '#8A8A8A'}
          height="25px"
          name="learned"
        />
      </StyledLink>
      <StyledLink to="/refreshqueue">
        <Icon
          style={{}}
          fill={status === 3 ? '#FF328B' : '#8A8A8A'}
          height="25px"
          name="refresh-queue"
        />
      </StyledLink>
    </StyledNav>
  )
}
