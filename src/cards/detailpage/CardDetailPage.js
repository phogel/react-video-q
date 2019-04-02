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
    onStartSecondsChange,
    onEndSecondsChange,
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
    props.onCategoryClick(card.id, 1)
  }
  function onLearnedClick() {
    props.onCategoryClick(card.id, 2)
  }
  function onRefreshClick() {
    props.onCategoryClick(card.id, 3)
  }

  function onCheckboxClick() {
    props.onCheckboxClick(card.id)
  }

  function onSliderChange(refreshDate) {
    props.onSliderChange(card.id, refreshDate)
  }

  function onVideoStateChange(event) {
    props.onVideoStateChange(event, card)
    // if (!isLoop) {
    event.data === 0 && setPlaying(false)
    event.data === 1 && setPlaying(true)
    event.data === 2 && setPlaying(false)
    // }
    // } else if (isLoop && event.data === 0) {
    //   setTimeout(() => {
    //     setPlaying(true)
    //   }, 2000)
    // }
  }
  const [playing, setPlaying] = useState(false)

  return (
    <Grid>
      <Video>
        <YouTubeVideo
          card={card}
          setStart={onStartSecondsChange}
          setEnd={onEndSecondsChange}
          startSeconds={card.startSeconds}
          endSeconds={card.endSeconds}
          onStateChange={onVideoStateChange}
          videoId={card.id}
          player={player}
          setPlayer={setPlayer}
          playing={playing}
        />
        <BackButton />
      </Video>
      <Timer
        start={card.startSeconds}
        end={card.endSeconds}
        card={card}
        setStart={onStartSecondsChange}
        setEnd={onEndSecondsChange}
        cards={cards}
        setCards={setCards}
        setPlaying={setPlaying}
        playing={playing}
        onStartSecondsChange={onStartSecondsChange}
        onEndSecondsChange={onEndSecondsChange}
        isLoop={isLoop}
        setIsLoop={setIsLoop}
      />
      {isEditable ? (
        <MainEditComponent
          card={card}
          onDeleteCardClick={onDeleteCardClickHandler}
          onEditCardClick={onEditCardClickHandler}
          onSaveCardClick={onSaveCardClick}
          setIsEditable={setIsEditable}
        />
      ) : (
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
