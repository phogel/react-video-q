import React from 'react'
import styled from 'styled-components'
import { MdEdit } from 'react-icons/md'
import LastSeen from './LastSeen'
import SwitchButton from './SwitchButton'

const MainGrid = styled.section`
  display: grid;
  margin: 0 30px 0 30px;
  grid-template-rows: 30px 1fr auto;
`

const ContentGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-rows: auto auto auto 1fr;
`

const ButtonList = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  justify-content: flex-end;
  align-items: center;
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
  max-height: 66px;
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
  transition: all 0.4s;
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

export default function CardsDetailPage({
  card,
  onEditCardClickHandler,
  onCheckboxClick,
  onSliderChange,
  status,
}) {
  function tagColor(status) {
    let backgrounds = ['#FFBA49 ', '#00CCA9', '#FF328B']
    return { background: backgrounds[status - 1] || 'rgba(26, 26, 26, 0.57)' }
  }

  function renderTag(text, index) {
    return (
      <Tag tagColor={tagColor(status)} key={index}>
        {text}
      </Tag>
    )
  }

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
