import React from 'react'
import styled from 'styled-components'
import Icon from './Icon'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`

const StyledSpinner = styled.div`
  animation: logo-spin infinite 2s linear;
  @keyframes logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

export default function Spinner() {
  return (
    <Container>
      <StyledSpinner>
        <Icon height="35px" name="refresh-queue" />
      </StyledSpinner>
    </Container>
  )
}
