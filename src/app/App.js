import React, { useReducer, useEffect } from 'react'
import GlobalStyle from './GlobalStyle'
import { Helmet } from 'react-helmet'
import CardsContainer from '../cards/CardsContainer'
import CardDetailPage from '../cards/CardDetailPage'
import CardsRender from '../cards/CardsRender'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import { getDataFromStorage, saveDataToStorage } from '../services'

const Grid = styled.div`
  display: grid;
  height: 100vh;
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
        <Route
          exact
          path="/"
          render={() => (
            <Grid>
              <CardsContainer>
                <CardsRender
                  cards={state.cards.filter(card => card.status === 0)}
                />
              </CardsContainer>
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
