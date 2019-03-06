import React from 'react'
import styled from 'styled-components'
import { MdExpandMore } from 'react-icons/md'
import Icon from '../common/Icon'

const Grid = styled.section`
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

const StyledTitle = styled.h3`
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  align-items: center;
`

const CategoryButton = styled.div`
  width: 33vw;
  max-width: 100px;
  height: auto;
  text-align: center;
  font-size: 12px;
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
        <img src={card.backgroundImageUrl} alt={card.title} />
      </VideoEmbed>
      <StyledTitle>{card.title + ' ' + card.id}</StyledTitle>
      {card.tags && <TagList>{card.tags.map(renderTag)}</TagList>}
      <StyledNotes>{card.notes}</StyledNotes>
      <CategoryButtonContainer>
        <CategoryButton>
          <Icon fill="#C4C4C4" height="45px" name="learning-queue" />
          Move to <br />
          learning queue
        </CategoryButton>
        <CategoryButton>
          <Icon fill="#C4C4C4" height="45px" name="learned" />
          Mark as <br />
          learned
        </CategoryButton>
        <CategoryButton>
          <Icon fill="#C4C4C4" height="45px" name="refresh-queue" />
          Move to <br />
          refresh queue
        </CategoryButton>
      </CategoryButtonContainer>
    </Grid>
  )
}
