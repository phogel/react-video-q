import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { MdKeyboardArrowRight } from 'react-icons/md'
import logo from '../images/logo.svg'

const Grid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1a1a1a;
  padding: 10px 10px 10px 10px;
  z-index: 0;
  overflow: hidden;
  /* background-image: url("${logo}");
  background-repeat: no-repeat;
  background-position: 10px 12px; */
`

const StyledInput = styled.input`
  display: fixed;
  width: 100%;
  right: 0;
  height: 32px;
  border: none;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
  padding: 12px 12px;
  font-size: 14px;
  background: rgb(250, 250, 250);
  ::placeholder {
    color: #c4c4c4;
  }
  /* ::-webkit-search-cancel-button {
    -webkit-appearance: none;
    content: 'X';
    color: white;
    height: 10px;
    width: 10px;
    background: red;
  } */
  :focus {
    outline: none;
  }
  animation: move-left 0.2s ease-out;

  @keyframes move-left {
    0% {
      transform: translateX(15rem);
    }
    100% {
      transform: translateX(0);
    }
  }
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

export default function SearchBar({ onSearchChange, searchString }) {
  const input = useRef(null)

  useEffect(() => {
    input.current.focus()
  }, [])

  return (
    <Grid>
      <StyledInput
        value={searchString}
        type="search"
        ref={input}
        placeholder="Enter title or tag"
        onChange={onSearchChange}
      />
      <BackButton onClick={goBack}>
        <MdKeyboardArrowRight color="#fefdfd" size="30px" />
      </BackButton>
    </Grid>
  )
}
