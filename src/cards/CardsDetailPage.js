import React from 'react'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
`

const BackButton = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  height: 30px;
  width: 30px;
  opacity: 0.75;
  background: black;
`

const VideoEmbed = styled.div`
  > img {
    width: 100vw;
  }
`

const StyledTitle = styled.h3`
  display: block;
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 24px;
  margin-bottom: 5px;
`

const TagList = styled.ul`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  overflow: scroll;
`

const Tag = styled.li`
  display: inline-block;
  margin: 0 8px 6px 0;
  padding: 4px 8px;
  background: rgba(26, 26, 26, 0.57);
  border-radius: 10px;
  font-size: 0.75em;
  height: 22px;
`

export default function CardsDetailPage({ card, id }) {
  function goBack() {
    window.history.back()
  }
  return (
    <Grid>
      <BackButton onClick={goBack} />
      <VideoEmbed>
        <img src={card.backgroundImageUrl} />
      </VideoEmbed>
      <div>{card.title + ' ' + card.id}</div>
      <div>{card.tags}</div>
      <div>{card.notes}</div>
      <p>This is a cards detail page with ID {card.id} </p>
    </Grid>
  )
}
