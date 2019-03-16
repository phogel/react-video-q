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
export default function YouTubeVideo({ videoId }) {
  return (
    <VideoWrapper>
      <StyledIframe
        title={videoId}
        width="100%"
        height="auto"
        src={`https://www.youtube.com/embed/${videoId}?wmode=opaque&modestbranding=1&showinfo=0&rel=0&cc_load_policy=1&iv_load_policy=3&color=white&autohide=0`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </VideoWrapper>
  )
}
