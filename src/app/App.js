import React, { useState, useEffect } from 'react'
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
  const [cards, setCards] = useState(getDataFromStorage())

  // useEffect(() => {
  //   saveDataToStorage(cards)
  // }, [])

  // useEffect(() => {
  //   saveDataToStorage(cards)
  // }, [cards])

  function clickHandler(id, status) {
    const card = cards.find(card => card.id === id)
    const index = cards.indexOf(card)
    if (status === cards[index].status) {
      setCards([
        ...cards.slice(0, index),
        { ...cards[index], status: 0 },
        ...cards.slice(index + 1),
      ])
    } else {
      setCards([
        ...cards.slice(0, index),
        { ...cards[index], status: status },
        ...cards.slice(index + 1),
      ])
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
            href="https://fonts.googleapis.com/css?family=Roboto:400,700"
            rel="stylesheet"
          />
        </Helmet>
        <Route
          exact
          path="/"
          render={() => (
            <Grid>
              <CardsContainer>
                <CardsRender cards={cards.filter(card => card.status === 0)} />
              </CardsContainer>
            </Grid>
          )}
        />
        <Route
          path="/videos/:id"
          render={({ match }) => (
            <CardDetailPage
              onClick={clickHandler}
              status={cards.find(card => card.id === match.params.id).status}
              id={match.params.id}
              card={cards.find(card => card.id === match.params.id)}
            />
          )}
        />
        <GlobalStyle />
      </React.Fragment>
    </Router>
  )
}
