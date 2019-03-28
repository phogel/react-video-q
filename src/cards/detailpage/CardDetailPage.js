import React, { useState } from 'react'
import styled from 'styled-components'
import { MdDeleteForever, MdEdit } from 'react-icons/md'
import ButtonLearningQueue from './ButtonLearningQueue'
import ButtonLearned from './ButtonLearned'
import ButtonRefreshQueue from './ButtonRefreshQueue'
import YouTubeVideo from '../../youtube/YouTubeVideo'
import SwitchButton from './SwitchButton'
import CardEditForm from './CardEditForm'
import LastSeen from './LastSeen'
import BackButton from '../../common/BackButton'
import Timer from './Timer'

const Grid = styled.section`
  display: grid;
  grid-gap: 10px;
  grid-template-rows: auto 1fr auto;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  margin: 0 auto;
  max-width: 500px;
  background: rgb(250, 250, 250);
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06), 0 1px 5px rgba(0, 0, 0, 0.14);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`
const MainGrid = styled.section`
  display: grid;
  margin: 0 30px 0 30px;
  grid-template-rows: 30px auto 1fr;
`

const ContentGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-rows: auto auto auto 1fr;
`

const Video = styled.section`
  position: sticky;
  top: 0;
  left: 0;
`

const StyledTitle = styled.h3`
  display: block;
  font-size: 22px;
  font-weight: bold;
  display: ${p => (p.isEditable ? 'none' : null)};
`

const TagList = styled.ul`
  padding: 0;
  flex-wrap: wrap;
  max-height: 64px;
  overflow: scroll;
`

const Tag = styled.li`
  display: inline-block;
  margin: 0 8px 8px 0;
  padding: 4px 10px 21px 10px;
  ${p => p.tagColor};
  border-radius: 10px;
  height: 22px;
  color: #fdfdfd;
  font-size: 14px;
  transition: width 2s, height 2s, background-color 2s, transform 2s;
`

const StyledNotes = styled.div`
  position: relative;
  font-size: 15px;
  overflow: scroll;
  overflow-wrap: break-word;
  max-height: 76px;
  background: rgb(250, 250, 250);
  padding-bottom: 30px;
`

const CategoryButtonContainer = styled.section`
  display: grid;
  position: sticky;
  bottom: 0;
  background: rgb(250, 250, 250);
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 10px;
  user-select: none;
`

const ButtonList = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  justify-content: flex-end;
  align-items: center;
`

export default function CardsDetailPage(props) {
  const {
    card,
    status,
    onDeleteCardClick,
    onSaveCardClick,
    cards,
    setCards,
    setTime,
    time,
    setPlayer,
    player,
  } = props

  const [isEditable, setIsEditable] = useState(false)

  function onEditCardClickHandler() {
    setIsEditable(!isEditable)
  }

  function onDeleteCardClickHandler(card) {
    if (window.confirm('Do you really want to delete this card?')) {
      setTimeout(() => {
        onDeleteCardClick(card)
      }, 200)
      goBack()
    }
  }

  function goBack() {
    window.history.back()
  }

  function renderTag(text, index) {
    return (
      <Tag tagColor={tagColor(status)} key={index}>
        {text}
      </Tag>
    )
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

  function onCheckboxClick() {
    props.onCheckboxClick(card.id)
  }

  function onSliderChange(refreshDate) {
    props.onSliderChange(card.id, refreshDate)
  }

  function onVideoStateChange(event) {
    props.onVideoStateChange(event, card.id)
  }

  function tagColor(status) {
    let backgrounds = ['#EFA5D4', '#00CCA9', '#FF328B']
    return { background: backgrounds[status - 1] || 'rgba(26, 26, 26, 0.57)' }
  }

  const [go, setGo] = useState(false)

  function MainContent() {
    if (isEditable) {
      return (
        <MainGrid>
          <ButtonList>
            {card.lastSeenTime ? <LastSeen card={card} /> : <div />}
            <MdDeleteForever
              color={'rgba(26, 26, 26, 0.57)'}
              size={'20px'}
              style={{ marginRight: '20px' }}
              onClick={() => onDeleteCardClickHandler(card)}
            />
            <MdEdit
              color={'#FF328B'}
              size={'20px'}
              onClick={onEditCardClickHandler}
            />
          </ButtonList>
          <Timer
            card={card}
            cards={cards}
            setCards={setCards}
            setGo={setGo}
            setTime={setTime}
            time={time}
            player={player}
          />
          <CardEditForm
            card={card}
            onSubmit={onSaveCardClick}
            setIsEditable={setIsEditable}
          />
        </MainGrid>
      )
    } else {
      return (
        <MainGrid>
          <ButtonList>
            {card.lastSeenTime ? <LastSeen card={card} /> : <div />}
            <div />
            <MdEdit
              color={'rgba(26, 26, 26, 0.57)'}
              size={'20px'}
              onClick={onEditCardClickHandler}
            />
          </ButtonList>
          <Timer
            card={card}
            cards={cards}
            setCards={setCards}
            setGo={setGo}
            setTime={setTime}
            time={time}
            player={player}
          />
          <ContentGrid>
            <StyledTitle>{card.title}</StyledTitle>
            {card.tags && <TagList>{card.tags.map(renderTag)}</TagList>}

            <StyledNotes>
              {card.notes}
              {/* {card.notes.length > 300 ? <StyledNotesFade /> : null} */}
            </StyledNotes>
          </ContentGrid>
          {card.status === 2 ? (
            <SwitchButton
              cardRefreshDate={card.refreshDate}
              onCheckboxClick={onCheckboxClick}
              refresh={card.refresh}
              onSliderChange={onSliderChange}
            />
          ) : null}
        </MainGrid>
      )
    }
  }

  return (
    <Grid>
      <Video>
        <YouTubeVideo
          startSeconds={card.startSeconds}
          endSeconds={card.endSeconds}
          onStateChange={onVideoStateChange}
          setPlayer={setPlayer}
          player={player}
          go={go}
          setGo={setGo}
          videoId={card.id}
        />
        <BackButton />
      </Video>
      <MainContent />
      <CategoryButtonContainer>
        <ButtonLearningQueue status={status} onClick={onLearningClick} />
        <ButtonLearned status={status} onClick={onLearnedClick} />
        <ButtonRefreshQueue status={status} onClick={onRefreshClick} />
      </CategoryButtonContainer>
    </Grid>
  )
}
