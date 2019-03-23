import React from 'react'
import styled from 'styled-components'

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  border: none;
`
const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`

var tag = document.createElement('script')

tag.src = 'https://www.youtube.com/iframe_api'
var firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

function onYouTubeIframeAPIReady({ videoId }) {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: videoId,
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  })
}
function onPlayerReady(event) {
  event.target.playVideo()
}
var done = false
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000)
    done = true
  }
}
function stopVideo() {
  player.stopVideo()
}

export default function YouTubeVideo({
  videoId,
  onStateChange,
  startSeconds,
  endSeconds,
}) {
  return (
    <VideoWrapper>
      <StyledIframe
        title={videoId}
        width="100%"
        height="auto"
        src={`https://www.youtube.com/embed/${videoId}?wmode=opaque&modestbranding=1&showinfo=0&rel=0&cc_load_policy=1&iv_load_policy=3&color=white&autohide=0&start=${startSeconds}&end=${endSeconds}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        events={{ onStateChange: onStateChange }}
      />
    </VideoWrapper>
  )
}
