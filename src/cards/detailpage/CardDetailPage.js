import React, { useState } from 'react'
import styled from 'styled-components'
import { MdExpandMore, MdDeleteForever, MdEdit } from 'react-icons/md'
import ButtonLearningQueue from './ButtonLearningQueue'
import ButtonLearned from './ButtonLearned'
import ButtonRefreshQueue from './ButtonRefreshQueue'
import YouTubeVideo from '../../youtube/YouTubeVideo'
import SwitchButton from './SwitchButton'
import CardEditForm from './CardEditForm'

const Grid = styled.section`
  display: grid;
  grid-gap: 20px;
  grid-template-rows: auto 1fr auto;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-y: scroll;
  margin: 0 auto;
  max-width: 500px;
  background: #fcfcfc;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06), 0 1px 5px rgba(0, 0, 0, 0.14);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`
const MainContentGrid = styled.section`
  display: grid;
  margin: 0 30px 0 30px;
  grid-template-rows: 30px 1fr auto;
`

const ContentGrid = styled.div`
  display: grid;
  grid-template-rows: auto auto auto 1fr;
`

const Video = styled.section``

const BackButton = styled.div`
  margin: 0;
  position: absolute;
  top: 5px;
  left: 5px;
  height: 30px;
  width: 30px;
  opacity: 0.75;
  background: black;
  z-index: 10;
  border-radius: 5px;
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
`

const Tag = styled.li`
  display: inline-block;
  margin: 0 8px 8px 0;
  padding: 4px 10px 22px 10px;
  background: rgba(26, 26, 26, 0.57);
  border-radius: 10px;
  height: 22px;
  color: #fcfcfc;
  font-size: 14px;
`

const StyledNotes = styled.div`
  font-size: 16px;
  width: auto;
  overflow: scroll;
`

const CategoryButtonContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 10px;
  user-select: none;
`

const DeleteButton = styled.div`
  > * {
    cursor: pointer;
    user-select: none;
  }
`

const EditButton = styled.div`
  margin-left: 20px;
  > * {
    cursor: pointer;
    user-select: none;
  }
`

const EditSaveContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const ButtonList = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
`

export default function CardsDetailPage(props) {
  const { card, status, onDeleteCardClick, onSaveCardClick, lastSeen } = props

  const [isEditable, setIsEditable] = useState(false)

  function onEditCardClickHandler() {
    setIsEditable(!isEditable)
  }

  function onDeleteCardClickHandler(card) {
    setTimeout(() => {
      onDeleteCardClick(card)
    }, 200)
    goBack()
  }

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

  function onCheckboxClick() {
    props.onCheckboxClick(card.id)
  }

  function onSliderChange(refreshDate) {
    props.onSliderChange(card.id, refreshDate)
  }

  function onVideoStart(event) {
    props.onVideoStart(event, card.id)
  }

  function bgColor(status) {
    let backgrounds = [
      'rgb(250, 239, 246)',
      'rgb(212, 244,238)',
      'rgb(249,216,231)',
    ]
    return { background: backgrounds[status - 1] || '#fcfcfc' }
  }

  function MainContent() {
    if (isEditable) {
      return (
        <MainContentGrid>
          <ButtonList>
            <DeleteButton>
              <MdDeleteForever
                color={'rgba(26, 26, 26, 0.57)'}
                size={'25px'}
                onClick={() => onDeleteCardClickHandler(card)}
              />
            </DeleteButton>
            <EditSaveContainer>
              <EditButton>
                <MdEdit
                  color={'#FF328B'}
                  size={'25px'}
                  onClick={onEditCardClickHandler}
                />
              </EditButton>
            </EditSaveContainer>
          </ButtonList>
          <CardEditForm
            card={card}
            onSubmit={onSaveCardClick}
            setIsEditable={setIsEditable}
          />
          {card.status === 2 ? (
            <SwitchButton
              cardRefreshDate={card.refreshDate}
              onCheckboxClick={onCheckboxClick}
              refresh={card.refresh}
              onSliderChange={onSliderChange}
            />
          ) : (
            <div />
          )}
        </MainContentGrid>
      )
    } else {
      return (
        <MainContentGrid>
          <ButtonList>
            <div />
            <EditButton>
              <MdEdit
                color={'rgba(26, 26, 26, 0.57)'}
                size={'25px'}
                onClick={onEditCardClickHandler}
              />
            </EditButton>
          </ButtonList>
          <ContentGrid>
            <StyledTitle>{card.title}</StyledTitle>
            {card.tags && <TagList>{card.tags.map(renderTag)}</TagList>}
            <StyledNotes>{card.notes}</StyledNotes>
          </ContentGrid>
          {card.status === 2 ? (
            <SwitchButton
              cardRefreshDate={card.refreshDate}
              onCheckboxClick={onCheckboxClick}
              refresh={card.refresh}
              onSliderChange={onSliderChange}
            />
          ) : (
            <div />
          )}
        </MainContentGrid>
      )
    }
  }

  return (
    <React.Fragment>
      <Grid style={bgColor(status)}>
        <Video>
          <YouTubeVideo onStateChange={onVideoStart} videoId={card.id} />
          <BackButton onClick={goBack}>
            <MdExpandMore color={'#FCFCFC'} size={'30px'} />
          </BackButton>
        </Video>
        <MainContent />
        <CategoryButtonContainer>
          <ButtonLearningQueue status={status} onClick={onLearningClick} />
          <ButtonLearned status={status} onClick={onLearnedClick} />
          <ButtonRefreshQueue status={status} onClick={onRefreshClick} />
        </CategoryButtonContainer>
      </Grid>
    </React.Fragment>
  )
}
