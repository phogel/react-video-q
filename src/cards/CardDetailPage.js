import React from 'react'
import styled from 'styled-components'
import { MdExpandMore } from 'react-icons/md'
import ButtonLearningQueue from './ButtonLearningQueue'
import ButtonLearned from './ButtonLearned'
import ButtonRefreshQueue from './ButtonRefreshQueue'
import YouTubeVideo from '../YouTube/YouTubeVideo'

const Grid = styled.section`
  display: grid;
  user-select: none;
  grid-gap: 20px;
  position: relative;
  grid-template-rows: auto auto auto 1fr auto;
  height: 100vh;
  width: 100vw;
  margin: 0 auto;
  max-width: 500px;
  background: #fcfcfc;
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
  z-index: 2;
`

const StyledTitle = styled.h3`
  padding: 0 30px 0 30px;
  display: block;
  font-size: 22px;
  font-weight: bold;
`

const TagList = styled.ul`
  padding: 0 30px 0 30px;
  display: flex;
  width: 100%;
  flex-wrap: wrap;
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
  padding: 0 30px 0 30px;
  font-size: 16px;
  overflow: scroll;
  line-height: 24px;
`

const CategoryButtonContainer = styled.section`
  display: grid;
  padding: 0 30px 0 30px;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 20px;
  user-select: none;
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
        <YouTubeVideo videoId={card.id} />
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
