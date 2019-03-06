import React from 'react'
import styled from 'styled-components'
import { MdExpandMore } from 'react-icons/md'

const Grid = styled.div`
  display: grid;
  grid-template-rows: auto auto auto 1fr auto;
  height: 100vh;
  width: 100vw;
  & > * {
    margin: 20px 30px 0 30px;
  }
  overflow: hidden;
`

const BackButton = styled.div`
  margin: 0;
  position: fixed;
  top: 5px;
  left: 5px;
  height: 30px;
  width: 30px;
  opacity: 0.75;
  background: black;
`

const VideoEmbed = styled.div`
  margin: 0;
  text-align: center;
  > img {
    width: 100vw;
    max-height: 30vh;
  }
`

const StyledTitle = styled.div`
  display: block;
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 22px;
  font-weight: bold;
`

const TagList = styled.ul`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 0;
  margin-top: 10px;
`

const Tag = styled.li`
  display: inline-block;
  margin: 0 8px 0 0;
  padding: 4px 10px 22px 10px;
  background: rgba(26, 26, 26, 0.57);
  border-radius: 10px;
  height: 22px;
  color: #fcfcfc;
  font-size: 14px;
`

const StyledNotes = styled.div`
  font-size: 16px;
  overflow: scroll;
  line-height: 24px;
`

const CategoryButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 20px;
  align-items: center;
`

const CategoryButton = styled.div`
  width: 33vw;
  max-width: 100px;
  height: auto;
  text-align: center;
  font-size: 14px;
`

export default function CardsDetailPage({ card }) {
  function goBack() {
    window.history.back()
  }
  function renderTag(text, index) {
    return <Tag key={index}>{text}</Tag>
  }
  return (
    <Grid>
      <BackButton onClick={goBack}>
        <MdExpandMore color={'#FCFCFC'} size={'30px'} />
      </BackButton>
      <VideoEmbed>
        <img src={card.backgroundImageUrl} />
      </VideoEmbed>
      <StyledTitle>{card.title + ' ' + card.id}</StyledTitle>
      {card.tags && <TagList>{card.tags.map(renderTag)}</TagList>}
      <StyledNotes>{card.notes}</StyledNotes>
      <CategoryButtonContainer>
        <CategoryButton>Move to learning queue</CategoryButton>
        <CategoryButton>
          Mark as <br />
          learned
        </CategoryButton>
        <CategoryButton>
          Move to <br />
          refresh queue
        </CategoryButton>
      </CategoryButtonContainer>
    </Grid>
  )
}
