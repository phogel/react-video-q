import React from 'react'
import styled from 'styled-components'

const Group = styled.div``
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

const StyledLabel = styled.label`
  color: #999;
  font-size: 18px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 0.2s ease all;
`

const Bar = styled.span`
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

export default function Input({ placeholder, name }) {
  return (
    <Group className="group">
      <StyledInput
        className="input"
        type="text"
        name={name}
        placeholder={placeholder}
      />
      <Bar className="bar" />
    </Group>
  )
}
// /* LABEL ======================================= */

//   /* active state */
//   input:focus ~ label, input:valid ~ label 		{
//   top:-20px;
//   font-size:14px;
//   color:#9E9E9E;
//   }

//   /* active state */
//   input:focus ~ .bar:before, input:focus ~ .bar:after {
//   width:50%;
//   }

//   /* HIGHLIGHTER ================================== */
//   .highlight {
//   position:absolute;
//   height:60%;
//   width:100px;
//   top:25%;
//   left:0;
//   pointer-events:none;
//   opacity:0.5;
//   }

//   /* active state */
//   input:focus ~ .highlight {
//   animation:inputHighlighter 0.3s ease;
//   }

//   /* ANIMATIONS ================ */
//   @keyframes inputHighlighter {
//   from { background:#5264AE; }
//   to 	{ width:0; background:transparent; }
//   }
