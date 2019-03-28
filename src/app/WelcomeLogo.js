import React from 'react'
import styled from 'styled-components'
import logo from '../images/logo.svg'

const StyledWelcomeLogo = styled.section`
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: #1a1a1a;
  display: flex;
  align-content: center;
  justify-content: center;
  z-index: 20;
  animation: fade-out 1.5s normal ease-out;
  animation-fill-mode: forwards;
  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    60% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`

export default function WelcomeLogo({ showLogo, setShowLogo }) {
  setTimeout(() => {
    setShowLogo(false)
  }, 2000)

  return (
    <React.Fragment>
      {showLogo ? (
        <StyledWelcomeLogo>
          <img src={logo} alt="VIDEQ" style={{ userSelect: 'none' }} />
        </StyledWelcomeLogo>
      ) : null}
    </React.Fragment>
  )
}
