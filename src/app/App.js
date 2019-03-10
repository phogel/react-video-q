import React, { useReducer, useEffect } from 'react'
import GlobalStyle from './GlobalStyle'
import { Helmet } from 'react-helmet'
import CardDetailPage from '../cards/CardDetailPage'
import CardsContainer from '../cards/CardsContainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import { getDataFromStorage, saveDataToStorage } from '../services'
import PageTitle from '../common/PageTitle'
import Nav from '../common/Nav'
import Header from '../common/Header'
import SearchBar from '../search/SearchBar'

const Grid = styled.section`
  display: grid;
  height: 100vh;
  grid-template-rows: 48px 20px auto 48px;
`
const SearchGrid = styled.section`
  display: grid;
  height: 100vh;
  grid-template-rows: 48px auto 20px auto 48px;
`

export default function App() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      const { type, payload } = action
      switch (type) {
        case 'reset-status':
          return {
            cards: [
              ...state.cards.slice(0, payload.index),
              { ...state.cards[payload.index], status: 0 },
              ...state.cards.slice(payload.index + 1),
            ],
          }
        case 'update-status':
          return {
            cards: [
              ...state.cards.slice(0, payload.index),
              { ...state.cards[payload.index], status: payload.status },
              ...state.cards.slice(payload.index + 1),
            ],
          }
        default:
          return state
      }
    },
    { cards: getDataFromStorage() }
  )

  useEffect(() => {
    saveDataToStorage(state.cards)
  }, [state.cards])

  function clickHandler(id, status) {
    const card = state.cards.find(card => card.id === id)
    const index = state.cards.indexOf(card)
    if (status === state.cards[index].status) {
      dispatch({ type: 'reset-status', payload: { index } })
    } else {
      dispatch({ type: 'update-status', payload: { index, status } })
    }
  }

  return (
    <Router>
      <React.Fragment>
        <Helmet>
          <title>video-q</title>
          <meta
            name="description"
            content="Learn videos with VIDEO-Q: your app to keep track of learned videos. Check it out now!"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Dosis:700|Roboto:400,700"
            rel="stylesheet"
          />
        </Helmet>
        {/* card.description.includes */}
        <Route
          path="/search"
          render={() => (
            <SearchGrid>
              <Header />
              <SearchBar cards={state.cards} />
              <PageTitle title="All videos" status={''} />
              <CardsContainer cards={state.cards} />
              <Nav status={''} />
            </SearchGrid>
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <Grid>
              <Header cards={state.cards} />
              <PageTitle title="Not learned yet" status={0} />
              <CardsContainer
                cards={state.cards.filter(card => card.status === 0)}
              />
              <Nav status={0} />
            </Grid>
          )}
        />
        <Route
          path="/learningqueue"
          render={() => (
            <Grid>
              <Header cards={state.cards} />
              <PageTitle title="Learning queue" status={1} />
              <CardsContainer
                cards={state.cards.filter(card => card.status === 1)}
              />
              <Nav status={1} />
            </Grid>
          )}
        />
        <Route
          path="/learned"
          render={() => (
            <Grid>
              <Header cards={state.cards} />
              <PageTitle title="Learned" status={2} />
              <CardsContainer
                cards={state.cards.filter(card => card.status === 2)}
              />
              <Nav status={2} />
            </Grid>
          )}
        />
        <Route
          path="/refreshqueue"
          render={() => (
            <Grid>
              <Header cards={state.cards} />
              <PageTitle title="Refresh Queue" status={3} />
              <CardsContainer
                cards={state.cards.filter(card => card.status === 3)}
              />
              <Nav status={3} />
            </Grid>
          )}
        />
        <Route
          path="/videos/:id"
          render={({ match }) => (
            <CardDetailPage
              onClick={clickHandler}
              status={
                state.cards.find(card => card.id === match.params.id).status
              }
              id={match.params.id}
              card={state.cards.find(card => card.id === match.params.id)}
            />
          )}
        />
        <GlobalStyle />
      </React.Fragment>
    </Router>
  )
}
