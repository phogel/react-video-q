import React, { useState, useEffect } from 'react'
import CardsContainer from '../cards/CardsContainer'

const gapi = window.gapi

export default function Content({ playlistId }) {
  const [playlistItems, setPlaylistItems] = useState([])
  const [initialized, setInitialized] = useState(false)

  if (!initialized) {
    gapi.client.youtube.playlistItems
      .list({
        maxResults: '50',
        part: 'snippet,contentDetails',
        playlistId: playlistId,
      })
      .then(response => {
        console.log('response')
        setPlaylistItems(response.result.items)
      })
      .catch(err => alert('Error'))
  }

  useEffect(() => {
    setInitialized(true)
  }, [playlistItems])

  return (
    <React.Fragment>
      {console.log(playlistItems)}
      <CardsContainer cards={playlistItems} />
    </React.Fragment>
  )
}
