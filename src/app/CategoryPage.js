import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import SwipeableRoutes from 'react-swipeable-routes'
import Header from '../common/Header'
import PageTitle from '../common/PageTitle'
import Nav from '../common/Nav'
import CardsContainer from '../cards/CardsContainer'

const Grid = styled.section`
  display: grid;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  grid-template-rows: 48px auto 48px;
`

const CategoryGrid = styled.section`
  display: grid;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  grid-template-rows: 28px auto;
`

export default function CategoryPage({ history, cards, checkIfRefresh }) {
  const NotLearnedYet = () => (
    <CategoryGrid style={{ height: '100vh', 'overflow-y': 'scroll' }}>
      <PageTitle title="Not learned yet" status={0} />
      <CardsContainer
        checkIfRefresh={checkIfRefresh()}
        cards={cards.filter(card => card.status === 0)}
      />
    </CategoryGrid>
  )

  return (
    <Router>
      <Grid>
        <Header history={history} />
        <SwipeableRoutes>
          <Route path="category/notlearnedyet" component={NotLearnedYet} />
          {/* <Route
            path="category/learningqueue"
            render={({ history }) => (
              <CategoryGrid>
                <PageTitle title="Learning queue" status={1} />
                <CardsContainer
                  checkIfRefresh={checkIfRefresh()}
                  cards={cards.filter(card => card.status === 1)}
                />
              </CategoryGrid>
            )}
          />
          <Route
            path="category/learned"
            render={({ history }) => (
              <CategoryGrid>
                <PageTitle title="Learned" status={2} />
                <CardsContainer
                  checkIfRefresh={checkIfRefresh()}
                  cards={cards.filter(card => card.status === 2)}
                />
              </CategoryGrid>
            )}
          />
          <Route
            path="category/refreshqueue"
            render={({ history }) => (
              <CategoryGrid>
                <PageTitle title="Refresh Queue" status={3} />
                <CardsContainer
                  checkIfRefresh={checkIfRefresh()}
                  cards={cards.filter(card => card.status === 3)}
                />
              </CategoryGrid>
            )}
          /> */}
        </SwipeableRoutes>
        <Nav status={0} />
      </Grid>
    </Router>
  )
}
