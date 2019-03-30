import React from 'react'
import CardsContainer from '../../cards/CardsContainer'

export default function Content({ playlistItems }) {
  if (playlistItems && playlistItems.length > 0) {
    return <CardsContainer hasLink={false} cards={playlistItems} />
  } else {
    return null
  }
}
