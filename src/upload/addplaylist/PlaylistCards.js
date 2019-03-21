import React, { useState, useEffect } from 'react'
import CardsContainer from '../../cards/CardsContainer'

const gapi = window.gapi

export default function Content({
  playlistId,
  togglePlaylistInitialized,
  playlistInitialized,
  playlistChanged,
}) {
  const [playlistItems, setPlaylistItems] = useState([])
  const [newArray, setNewArray] = useState([])

  if (!playlistInitialized) {
    console.log('playlistInitialized: ' + playlistInitialized)
    gapi.client.youtube.playlistItems
      .list({
        maxResults: '50',
        part: 'snippet,contentDetails,status,id',
        playlistId: playlistId,
      })
      .then(response => {
        setPlaylistItems(response.result.items)
        convertYouTubeArray(response.result.items)
      })
      .catch(err => console.log(err))
    setTimeout(() => {
      togglePlaylistInitialized()
    }, 1000)
  }

  useEffect(() => {
    togglePlaylistInitialized()
  }, [])

  function convertYouTubeArray(playlistItems) {
    console.log(playlistItems)
    setNewArray(
      playlistItems.map(item => {
        return {
          id: item.contentDetails.videoId,
          title: item.snippet.title,
          notes: item.snippet.description,
          bgImageUrl: item.snippet.thumbnails.standard.url,
        }
      })
    )
  }

  return (
    <React.Fragment>
      <CardsContainer cards={newArray} />
    </React.Fragment>
  )
}
