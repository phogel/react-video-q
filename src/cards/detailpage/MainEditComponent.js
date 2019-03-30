import React from 'react'
import styled from 'styled-components'
import { MdDeleteForever, MdEdit } from 'react-icons/md'
import CardEditForm from './CardEditForm'
import LastSeen from './LastSeen'

const MainGrid = styled.section`
  display: grid;
  margin: 0 30px 0 30px;
  grid-template-rows: 30px auto 1fr;
`

const ButtonList = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  justify-content: flex-end;
  align-items: center;
`

export default function CardsDetailPage({
  card,
  onDeleteCardClick,
  onEditCardClick,
  onSaveCardClick,
  setIsEditable,
}) {
  return (
    <MainGrid>
      <ButtonList>
        {card.lastSeenTime ? <LastSeen card={card} /> : <div />}
        <MdDeleteForever
          color={'rgba(26, 26, 26, 0.57)'}
          size={'20px'}
          style={{ marginRight: '20px' }}
          onClick={() => onDeleteCardClick(card)}
        />
        <MdEdit color={'#FF328B'} size={'20px'} onClick={onEditCardClick} />
      </ButtonList>
      <CardEditForm
        card={card}
        onSubmit={onSaveCardClick}
        setIsEditable={setIsEditable}
      />
    </MainGrid>
  )
}
