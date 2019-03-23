import React from 'react'
import Card from './Card'
import styled from 'styled-components'

const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 300px));
  align-content: flex-start;
  justify-content: space-around;
  grid-gap: 37px;
  padding: 25px;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-padding: 37px;
  -webkit-overflow-scrolling: touch;
`

export default function CardsRender({ cards }) {
  return (
    <CardContainer>
      {cards.map((card, index) => (
        <Card card={card} key={index} />
      ))}
    </CardContainer>
  )
}
