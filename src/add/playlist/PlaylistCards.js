import React from 'react'
import CardsContainerSmall from '../../cards/CardsContainerSmall'

export default function Content({ playlistItems }) {
  if (playlistItems && playlistItems.length > 0) {
    return <CardsContainerSmall cards={playlistItems} />
  } else {
    return null
  }
}