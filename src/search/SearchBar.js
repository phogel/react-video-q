import React from 'react'
import styled from 'styled-components'
import { MdClose } from 'react-icons/md'

const Grid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  align-items: center;
  background: #1a1a1a;
  padding: 0 10px 10px 10px;
`

const StyledInput = styled.input`
  width: 100%;
  height: 36px;
  border: 1px solid rgba(196, 196, 196, 0.66);
  border-radius: 50px;
`
const BackButton = styled.div`
  margin: 0;
  height: 30px;
  width: 30px;
  z-index: 10;
  border-radius: 5px;
`

function goBack() {
  window.history.back()
}

function searchLogic(cards) {
  console.log('hello')
}

export default function SearchBar({ cards }) {
  return (
    <Grid>
      <StyledInput type="text" onInput={searchLogic(cards)} />
      <BackButton onClick={goBack}>
        <MdClose color={'#8A8A8A'} size={'30px'} />
      </BackButton>
    </Grid>
  )
}
