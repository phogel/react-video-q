import React, { useEffect, useState } from 'react'
import YouTubeIframeLoader from 'youtube-iframe'
import styled from 'styled-components'

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  border: none;
`

const StyledDiv = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`

export default function YouTubeVideo({
  videoId,
  onStateChange,
  startSeconds,
  endSeconds,
  setGo,
  go,
}) {
  useEffect(() => {
    console.log('ytpage load')
  }, [])

  useEffect(() => {
    console.log('endseconds load')
  }, [endSeconds])

  useEffect(() => {
    console.log('startseconds load')
  }, [startSeconds])

  YouTubeIframeLoader.load(function(YT) {
    new YT.Player('player', {
      height: 'auto',
      width: '100%',
      host: 'https://www.youtube.com',
      origin: 'http://localhost:3000',
      videoId: videoId,
      enablejsapi: 1,
      showinfo: 0,
      cc_load_policy: 0,
      controls: 0,
      disablekb: 0,
      modestbranding: 1,
      rel: 0,
      playerVars: {
        start: startSeconds,
        end: endSeconds,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onStateChange,
      },
    })
  })

  const [player, setPlayer] = useState()
  function onPlayerReady(event) {
    setPlayer(event.target)
  }

  if (go) {
    player.seekTo(startSeconds).playVideo()
    setTimeout(() => {
      setGo(false)
    }, 500)
  }

  return (
    <VideoWrapper>
      <StyledDiv id="player" />
    </VideoWrapper>
  )
}
