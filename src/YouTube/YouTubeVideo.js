import React, { Component } from 'react'
import YouTube from 'react-youtube'

export default class YouTubeVideo extends Component {
  videoOnReady(event) {
    // access to player in all event handlers via event.target
    event.target.stopVideo()
  }

  render() {
    const opts = {
      height: '210',
      width: '100%',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        //  autoplay: 1,
      },
    }
    const { videoId, onStateChange } = this.props
    return (
      <YouTube
        videoId={videoId}
        opts={opts}
        onStateChange={onStateChange}
        onReady={this.videoOnReady}
      />
    )
  }
}
