import React from 'react'
import styled from 'styled-components'

const Title = styled.div`
  width: 100%;
  font-size: 24px;
  text-decoration: bold;
  font-family: 'Dosis', sans-serif;
`

export default function PageTitleFullscreen({ title }) {
  return <Title>{title}</Title>
}
