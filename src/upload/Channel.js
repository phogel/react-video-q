import React, { useState } from 'react'
import styled from 'styled-components'
import PageTitleFullscreen from '../common/PageTitleFullscreen'
import Input from '../common/Input'

const StyledForm = styled.form`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 20px;
`

const gapi = window.gapi

export default function ChannelComponent() {
  const [channel, setChannel] = useState('')
  const [initialized, setInitialized] = useState(false)
  function responseHandler(response) {
    setChannel(response.result.items[0].id)
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
      .catch(err => alert('No channel by that name'))
    setInitialized(true)
  }

  function onChangeHandler(event) {
    setChannel(event.target.value)
  }

  function onSubmitHandler(event) {
    alert('your selected channel is: ' + channel)
    event.preventDefault()
  }

  return (
    <React.Fragment>
      <PageTitleFullscreen title="Enter your YouTube channel ID" />
      <StyledForm onSubmit={onSubmitHandler}>
        <Input
          id="input-field"
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
