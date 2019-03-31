import React, { useState } from 'react'
import styled from 'styled-components'
import ButtonLearningQueue from './ButtonLearningQueue'
import ButtonLearned from './ButtonLearned'
import ButtonRefreshQueue from './ButtonRefreshQueue'
import YouTubeVideo from '../../youtube/YouTubeVideo'
import BackButton from '../../common/BackButton'
import Timer from './Timer'
import MainEditComponent from './MainEditComponent'
import MainDefaultComponent from './MainDefaultComponent'

const Grid = styled.section`
  display: grid;
  grid-gap: 10px;
  grid-template-rows: auto 50px 1fr auto;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  margin: 0 auto;
  max-width: 500px;
  background: rgb(250, 250, 250);
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06), 0 1px 5px rgba(0, 0, 0, 0.14);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`

const Video = styled.section`
  position: sticky;
  top: 0;
  left: 0;
`

const CategoryButtonContainer = styled.section`
  display: grid;
  position: sticky;
  bottom: 0;
  background: rgb(250, 250, 250);
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: flex-start;
  padding-bottom: 10px;
  user-select: none;
`

export default function CardsDetailPage(props) {
  const {
    card,
    status,
    onDeleteCardClick,
    onSaveCardClick,
    cards,
    setCards,
    onTimerChange,
    player,
    setPlayer,
    isLoop,
    setIsLoop,
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
    props.onVideoStateChange(event, card)
  }

  const [go, setGo] = useState(false)

  return (
    <Grid>
      <Video>
        <YouTubeVideo
          startSeconds={card.startSeconds}
          endSeconds={card.endSeconds}
          onStateChange={onVideoStateChange}
          go={go}
          setGo={setGo}
          videoId={card.id}
          player={player}
          setPlayer={setPlayer}
        />
        <BackButton />
      </Video>
      <Timer
        card={card}
        cards={cards}
        setCards={setCards}
        setGo={setGo}
        onTimerChange={onTimerChange}
        isLoop={isLoop}
        setIsLoop={setIsLoop}
      />
      {isEditable && (
        <MainEditComponent
          card={card}
          onDeleteCardClick={onDeleteCardClickHandler}
          onEditCardClick={onEditCardClickHandler}
          onSaveCardClick={onSaveCardClick}
          setIsEditable={setIsEditable}
        />
      )}
      {!isEditable && (
        <MainDefaultComponent
          card={card}
          onEditCardClickHandler={onEditCardClickHandler}
          onCheckboxClick={onCheckboxClick}
          onSliderChange={onSliderChange}
          status={status}
        />
      )}
      <CategoryButtonContainer>
        <ButtonLearningQueue status={status} onClick={onLearningClick} />
        <ButtonLearned status={status} onClick={onLearnedClick} />
        <ButtonRefreshQueue status={status} onClick={onRefreshClick} />
      </CategoryButtonContainer>
    </Grid>
  )
}
