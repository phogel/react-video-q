import React from 'react'
import Card from './Card'
import styled from 'styled-components'

const CardContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));
  align-content: flex-start;
  justify-content: space-around;
  grid-gap: 37px;
  padding: 25px 25px;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-padding: 37px;
  -webkit-overflow-scrolling: touch;
`

export default function CardsRender({ cards }) {
  return (
    <CardContainer>
      {cards.map(card => (
        <Card
          key={card.id}
          title={card.title}
          tags={card.tags}
          backgroundImageUrl={card.backgroundImageUrl}
          id={card.id}
          uploadDate={card.uploadDate}
        />
      ))}
    </CardContainer>
  )
}
