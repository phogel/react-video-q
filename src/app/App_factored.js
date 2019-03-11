import React, { useReducer, useEffect, useState, useContext } from 'react'
import useReactRouter from 'use-react-router'
import styled from 'styled-components'
import { getDataFromStorage, saveDataToStorage } from '../services'
import GlobalStyle from './GlobalStyle'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from '../common/Header'
import SearchBar from '../search/SearchBar'
import PageTitle from '../common/PageTitle'
import CardDetailPage from '../cards/CardDetailPage'
import CardsContainer from '../cards/CardsContainer'
import Nav from '../common/Nav'

const Grid = styled.section`
  display: grid;
  height: 100vh;
  grid-template-rows: 48px auto 48px;
`
const PageGrid = styled.section`
  display: grid;
  height: auto;
  overflow: scroll;
  grid-template-rows: 20px auto;
  transition: 2s;
`

export default function App(props) {
  const { history, location, match } = useReactRouter()
  console.log(history)
  console.log(location)
  console.log(match)
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

  const [searchString, setSearchString] = useState('')

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

  function filteredCards(event) {
    return state.cards.filter(
      card =>
        card.title.includes(searchString) |
        card.tags.join().includes(searchString)
    )
  }

  function onSearchChange(event) {
    setSearchString(event.target.value)
    console.log(searchString)
  }
  console.log(props.match)

  const useReactRouter = () => {
    const forceUpdate = useForceUpdate()
    const routerContext = useContext(__RouterContext)
    return routerContext
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
        <Grid>
          {/* {props.match.includes('/videos') ? null : <Header />} */}
          <Route
            path="/search"
            render={() => (
              <PageGrid>
                <SearchBar onSearchChange={onSearchChange} />
                <PageTitle title="All videos" status={''} />
                <CardsContainer cards={filteredCards()} />
              </PageGrid>
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <PageGrid>
                <PageTitle title="Not learned yet" status={0} />
                <CardsContainer
                  cards={state.cards.filter(card => card.status === 0)}
                />
              </PageGrid>
            )}
          />
          <Route
            exact
            path="/learningqueue"
            render={() => (
              <PageGrid>
                <PageTitle title="Learning queue" status={1} />
                <CardsContainer
                  cards={state.cards.filter(card => card.status === 1)}
                />
              </PageGrid>
            )}
          />
          <Route
            exact
            path="/learned"
            render={() => (
              <PageGrid>
                <PageTitle title="Learned" status={2} />
                <CardsContainer
                  cards={state.cards.filter(card => card.status === 2)}
                />
              </PageGrid>
            )}
          />
          <Route
            exact
            path="/refreshqueue"
            render={() => (
              <PageGrid>
                <PageTitle title="Refresh queue" status={3} />
                <CardsContainer
                  cards={state.cards.filter(card => card.status === 3)}
                />
              </PageGrid>
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
          <Nav status={''} />
        </Grid>
        <GlobalStyle />
      </React.Fragment>
    </Router>
  )
}
