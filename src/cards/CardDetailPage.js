import React from 'react'
import styled from 'styled-components'
import { MdExpandMore } from 'react-icons/md'
import ButtonLearningQueue from './ButtonLearningQueue'
import ButtonLearned from './ButtonLearned'
import ButtonRefreshQueue from './ButtonRefreshQueue'

const Grid = styled.section`
  display: grid;
  position: relative;
  grid-template-rows: auto auto auto 1fr auto;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  max-width: 500px;
  background: #fcfcfc;
  & > * {
    margin: 20px 30px 0 30px;
  }
  overflow: hidden;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06), 0 1px 5px rgba(0, 0, 0, 0.14);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`

const BackButton = styled.div`
  margin: 0;
  position: absolute;
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
    width: 100%;
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
  align-items: flex-start;
  margin-bottom: 20px;
  user-select: none;
  cursor: pointer;
`

export default function CardsDetailPage(props) {
  const { card, status } = props

  function goBack() {
    window.history.back()
  }

  function renderTag(text, index) {
    return <Tag key={index}>{text}</Tag>
  }

  function onLearningClick() {
    props.onClick(card.id, 1)
  }
  function onLearnedClick() {
    props.onClick(card.id, 2)
  }
  function onRefreshClick() {
    props.onClick(card.id, 3)
  }

  return (
    <React.Fragment>
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
          <ButtonLearningQueue status={status} onClick={onLearningClick} />
          <ButtonLearned status={status} onClick={onLearnedClick} />
          <ButtonRefreshQueue status={status} onClick={onRefreshClick} />
        </CategoryButtonContainer>
      </Grid>
    </React.Fragment>
  )
}
