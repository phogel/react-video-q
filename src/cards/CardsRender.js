import React from 'react'
import Card from './Card'
export default function CardsRender({ cards }) {
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}
