import React, { Component } from 'react'
import YouTube from 'react-youtube'
import dayjs from 'dayjs'

//https://www.youtube.com/watch?v=GTsEfTfprsk
//https://youtu.be/GTsEfTfprsk
export default class YouTubeVideo extends Component {
  videoOnReady(event) {
    // access to player in all event handlers via event.target
    event.target.stopVideo()
  }

  render() {
    const opts = {
      height: '210',
      width: '375',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
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
