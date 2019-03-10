import React from 'react'
import styled from 'styled-components'
import { FiSearch } from 'react-icons/fi'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledInput = styled.input`
  position: relative;
  padding: 15px 40px 15px 20px;
  width: 20px;
  color: #525252;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 100;
  letter-spacing: 2px;
  border: none;
  border-radius: 5px;
  background: linear-gradient(to right, #ffffff 0%, #464747 #f9f9f9 100%);
  transition: width 0.4s ease;
  outline: none;

  &:focus {
    width: 100%;
  }
`

const StyledButton = styled.button`
  position: relative;
  left: -37px;
  color: #8233c5;
`

function goBack() {
  window.history.back()
}

function searchLogic(cards) {
  console.log('hello')
}

export default function SearchBar3({ cards }) {
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
