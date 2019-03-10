import React from 'react'
import PageTitle from '../common/PageTitle'
import CardsContainer from '../cards/CardsContainer'

const Grid = styled.section`
  display: grid;
  grid-auto-rows: auto;
`

export default function SearchPage() {
  return (
    <Grid>
      <PageTitle title="All videos" status={''} />
      <CardsContainer cards={searchLogic()} />
    </Grid>
  )
}
