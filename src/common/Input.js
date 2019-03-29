import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  font-size: 16px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid #e0e0e0;
  background: none;
  ::placeholder {
    color: #9e9e9e;
    font-size: 16px;
  }
  :focus {
    outline: none;
  }
`

const InputUnderline = styled.span`
  position: relative;
  display: block;
  width: 100%;
  :before,
  :after {
    content: '';
    height: 2px;
    width: 0;
    bottom: 0px;
    position: absolute;
    background: #ff328b;
    transition: 0.2s ease all;
  }
  :before {
    left: 50%;
  }
  :after {
    right: 50%;
  }
`

export default function Input({ placeholder, name, value, onChange }) {
  return (
    <React.Fragment>
      <StyledInput
        className="input"
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <InputUnderline />
    </React.Fragment>
  )
}
