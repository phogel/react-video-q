import React, { useEffect, useState } from 'react'
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
import HeaderSearchBar from '../common/HeaderSearchBar'
import dayjs from 'dayjs'

const Grid = styled.section`
  display: grid;
  height: 100vh;
  grid-template-rows: 48px 20px auto 48px;
`

export default function App() {
  const [cards, setCards] = useState(getDataFromStorage())

  useEffect(() => {
    saveDataToStorage(cards)
  }, [cards])

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

  function checkboxClickHandler(id) {
    const card = cards.find(card => card.id === id)
    const index = cards.indexOf(card)
    setCards([
      ...cards.slice(0, index),
      { ...cards[index], refresh: !card.refresh, refreshDate: '' },
      ...cards.slice(index + 1),
    ])
  }

  function sliderChangeHandler(id, refreshDate) {
    const card = cards.find(card => card.id === id)
    const index = cards.indexOf(card)
    setCards([
      ...cards.slice(0, index),
      { ...cards[index], refreshDate: refreshDate },
      ...cards.slice(index + 1),
    ])
  }

  const [searchString, setSearchString] = useState('')

  function searchWithinAllCards() {
    return cards
      .filter(
        card =>
          card.title.toLowerCase().includes(searchString.toLowerCase()) ||
          card.tags
            .join()
            .toLowerCase()
            .includes(searchString.toLowerCase())
      )
      .sort((a, b) => a.status - b.status)
  }

  function onSearchChange(event) {
    setSearchString(event.target.value)
  }

  function changeCardStatus(cardToChange) {
    const index = cards.indexOf(cardToChange)
    setCards([
      ...cards.slice(0, index),
      { ...cards[index], status: 3, refresh: false, refreshDate: '' },
      ...cards.slice(index + 1),
    ])
  }

  function checkIfRefresh() {
    cards.forEach(card => {
      if (card.refresh && dayjs().isAfter(card.refreshDate)) {
        changeCardStatus(card)
      }
    })
  }

  return (
    <Router>
      <React.Fragment>
        <Helmet>
          <title>vide-q</title>
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
          path="/search"
          render={() => (
            <Grid>
              <HeaderSearchBar
                searchString={searchString}
                onSearchChange={onSearchChange}
              />
              <PageTitle title="All videos" status={''} />
              <CardsContainer
                checkIfRefresh={checkIfRefresh()}
                cards={searchWithinAllCards()}
              />
              <Nav status={''} />
            </Grid>
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <Grid>
              <Header />
              <PageTitle title="Not learned yet" status={0} />
              <CardsContainer
                checkIfRefresh={checkIfRefresh()}
                cards={cards.filter(card => card.status === 0)}
              />
              <Nav status={0} />
            </Grid>
          )}
        />
        <Route
          path="/learningqueue"
          render={() => (
            <Grid>
              <Header />
              <PageTitle title="Learning queue" status={1} />
              <CardsContainer
                checkIfRefresh={checkIfRefresh()}
                cards={cards.filter(card => card.status === 1)}
              />
              <Nav status={1} />
            </Grid>
          )}
        />
        <Route
          path="/learned"
          render={() => (
            <Grid>
              <Header />
              <PageTitle title="Learned" status={2} />
              <CardsContainer
                checkIfRefresh={checkIfRefresh()}
                cards={cards.filter(card => card.status === 2)}
              />
              <Nav status={2} />
            </Grid>
          )}
        />
        <Route
          path="/refreshqueue"
          render={() => (
            <Grid>
              <Header />
              <PageTitle title="Refresh Queue" status={3} />
              <CardsContainer
                checkIfRefresh={checkIfRefresh()}
                cards={cards.filter(card => card.status === 3)}
              />
              <Nav status={3} />
            </Grid>
          )}
        />
        <Route
          path="/videos/:id"
          render={({ match }) => (
            <CardDetailPage
              checkIfRefresh={checkIfRefresh()}
              onCheckboxClick={checkboxClickHandler}
              onSliderChange={sliderChangeHandler}
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
