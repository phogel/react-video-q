import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  position: relative;
  padding: 12px 24px;
  overflow: hidden;
  border-width: 0;
  outline: none;
  border-radius: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
  font-size: 16px;
  text-transform: uppercase;
  height: 40px;
  width: 100%;
  background: #1a1a1a;
  color: rgb(250, 250, 250);
  transition: background-color 0.3s;
  :hover,
  :focus {
    background-color: #ff328b;
    outline: 0;
  }
  > * {
    position: relative;
  }
  span {
    display: block;
    padding: 12px 24px;
  }
  :before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0;
    padding-top: 0;
    border-radius: 100%;
    background-color: rgba(236, 240, 241, 0.3);
    transform: translate(-50%, -50%);
  }
  :active:before {
    width: 120%;
    padding-top: 120%;
    transition: width 0.2s ease-out, padding-top 0.2s ease-out;
  }
  :focus {
    outline: none;
  }
`

export default function Button({ label, icon }) {
  return <StyledButton>{label}</StyledButton>
}
