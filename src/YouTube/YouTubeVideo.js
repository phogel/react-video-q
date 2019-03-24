import React from 'react'
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
  onGoClick,
  setGo,
}) {
  YouTubeIframeLoader.load(function(YT) {
    const player = new YT.Player('player', {
      height: 'auto',
      width: '100%',
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

  function onPlayerReady(event) {
    console.log(event.target.seekTo(20))
  }

  const player = document.getElementById('player')

  if (onGoClick) {
    //player.seekTo(startSeconds)
    setGo(false)
  }

  return (
    <VideoWrapper>
      <StyledDiv id="player" />
    </VideoWrapper>
  )
}
