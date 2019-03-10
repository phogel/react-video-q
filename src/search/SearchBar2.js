import React from 'react'
import styled from 'styled-components'
import { FiSearch } from 'react-icons/fi'

const Container = styled.div`
  position: fixed;
  right: 0;
  top: 5px;
  background: #fefdfd;
  height: auto;
  border-radius: 48px;
  :hover > input {
    width: 100vw;
    padding: 0 6px;
  }
  :hover > button {
    background: '';
  }
`
const StyledInput = styled.input`
  border: none;
  right: 0;
  background: none;
  outline: none;
  padding: 0;
  color: #1a1a1a;
  font-size: 16px;
  transition: 0.4s;
  height: 36px;
  width: 0px;
`

const StyledButton = styled.button`
  position: fixed;
  background: #1a1a1a;
  border: none;
  top: 5px;
  right: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  transition: 0.4s;
  :focus {
    outline: 0;
    background: #fefdfd;
  }
`

function goBack() {
  window.history.back()
}

function searchLogic(cards) {
  console.log('hello')
}

export default function SearchBar2({ cards }) {
  return (
    <Container>
      <StyledInput
        type="text"
        onInput={searchLogic(cards)}
        placeholder="Type to search"
      />
      <StyledButton>
        <FiSearch color={'#8A8A8A'} size={'28px'} />
      </StyledButton>
    </Container>
  )
}
