import React, { useEffect, useRef } from 'react'
import YouTube from 'react-youtube'
import styled from 'styled-components'

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  border: none;
`

const StyledYouTube = styled(YouTube)`
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
  playing,
  setStart,
  setEnd,
  card,
}) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    console.log('useEffect YT')
    console.log(startSeconds)
    console.log(video)
    if (video) {
      playing ? video.playVideo(startSeconds) : video.pauseVideo()
    }
  }, [playing])

  function onReady(event) {
    videoRef.current = event.target
    startSeconds || setStart(card, 0)
    endSeconds || setEnd(card, videoRef.current.getDuration())
    console.log('videoRef', videoRef.current)
  }

  const opts = {
    height: 'auto',
    width: '100%',
    playerVars: {
      autoplay: Number(playing),
      start: startSeconds,
      end: endSeconds,
    },
  }

  return (
    <VideoWrapper>
      <StyledYouTube
        videoId={videoId}
        opts={opts}
        onStateChange={event => onStateChange(event)}
        onReady={onReady}
      />
    </VideoWrapper>
  )
}
