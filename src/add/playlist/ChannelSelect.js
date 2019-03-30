import React, { useState } from 'react'
import styled from 'styled-components'
import PageTitleFullscreen from '../../common/PageTitleFullscreen'
import Input from '../../common/Input'

const StyledForm = styled.form`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 20px;
`

const gapi = window.gapi

export default function ChannelComponent() {
  const [channel, setChannel] = useState('')
  const [channelLength, setChannelLength] = useState(1)
  const [initialized, setInitialized] = useState(false)

  function responseHandler(response) {
    setChannel(response.result.items[0].id)
    setChannelLength(response.result.items.length)
  }

  if (!initialized) {
    gapi.client.youtube.channels
      .list({
        part: 'snippet,contentDetails,statistics',
        mine: 'true',
      })
      .then(response => {
        responseHandler(response)
      })
      .catch(err => console.log(err))
    setInitialized(true)
  }

  function onChangeHandler(event) {
    setChannel(event.target.value)
  }

  function onSubmitHandler(event) {
    console.log('your selected channel is: ' + channel)
    event.preventDefault()
  }

  if (channelLength === 1) {
    return null
  } else {
    return (
      <React.Fragment>
        <PageTitleFullscreen title="Enter your YouTube channel ID" />
        <StyledForm onSubmit={onSubmitHandler}>
          <Input
            name="channel"
            placeholder="Channel name"
            value={channel}
            onChange={e => onChangeHandler(e)}
          />
          <input type="submit" value="Set channel" />
        </StyledForm>
      </React.Fragment>
    )
  }
}
