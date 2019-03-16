import React from 'react'
import styled from 'styled-components'

const Grid = styled.section`
  display: grid;
  grid-auto-rows: auto;
  width: 100%;
  margin: auto 0;
  grid-gap: 20px;
  padding: 20px;
`

export default function LoginPage() {
  return (
    <Grid>
      Log In to your YouTube account
      <button id="authorize-button">Login</button>
      <form className="form__group" style={{ display: 'none' }}>
        <input
          id="playlist"
          name="playlist"
          placeholder="Playlist name"
          type="text"
          className="form__field"
        />
        <label htmlFor="playlist" className="form__label">
          Enter playlist name
        </label>
        <input type="submit" value="Load videos from playlist" />
      </form>
    </Grid>
  )
}
