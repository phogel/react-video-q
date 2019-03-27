import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { getCardsFromStorage, saveCardsToStorage } from '../services'
import { Helmet } from 'react-helmet'
import dayjs from 'dayjs'
import GlobalStyle from './GlobalStyle'
import Header from '../common/Header'
import HeaderSearchBar from '../search/HeaderSearchBar'
import PageTitle from '../common/PageTitle'
import CardsContainer from '../cards/CardsContainer'
import Nav from '../common/Nav'
import CardDetailPage from '../cards/detailpage/CardDetailPage'
import AddIdPage from '../add/id/AddIdPage'
import AddPlaylistPage from '../add/playlist/AddPlaylistPage'
import Dashboard from '../dashboard/Dashboard'
import CategoryPage from './CategoryPage'

const Grid = styled.section`
  display: grid;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  grid-template-rows: 48px 28px auto 48px;
`

export default function App() {
  const [cards, setCards] = useState(getCardsFromStorage())
  const [searchString, setSearchString] = useState('')
  const [showLogo, setShowLogo] = useState(true)

  useEffect(() => {
    saveCardsToStorage(cards)
  }, [cards])

  function createCard(data) {
    setCards([...cards, data])
  }

  function clickHandler(id, status) {
    const card = cards.find(card => card.id === id)
    const index = cards.indexOf(card)
    if (status === card.status) {
      setCards([
        ...cards.slice(0, index),
        { ...card, status: 0, refresh: false },
        ...cards.slice(index + 1),
      ])
    } else {
      setCards([
        ...cards.slice(0, index),
        { ...card, status: status, refresh: false },
        ...cards.slice(index + 1),
      ])
    }
  }

  function checkboxClickHandler(id) {
    const card = cards.find(card => card.id === id)
    const index = cards.indexOf(card)
    setCards([
      ...cards.slice(0, index),
      { ...card, refresh: !card.refresh, refreshDate: '' },
      ...cards.slice(index + 1),
    ])
  }

  function sliderChangeHandler(id, refreshDate) {
    const card = cards.find(card => card.id === id)
    const index = cards.indexOf(card)
    setCards([
      ...cards.slice(0, index),
      { ...card, refreshDate: refreshDate },
      ...cards.slice(index + 1),
    ])
  }

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

  function changeCardStatus(card) {
    const index = cards.indexOf(card)
    setCards([
      ...cards.slice(0, index),
      { ...card, status: 3, refresh: false, refreshDate: '' },
      ...cards.slice(index + 1),
    ])
  }

  function videoStateChangeHandler(event, id) {
    if (event.data === 1) {
      const date = dayjs()
      const card = cards.find(card => card.id === id)
      const index = cards.indexOf(card)
      setCards([
        ...cards.slice(0, index),
        { ...card, lastSeenTime: date },
        ...cards.slice(index + 1),
      ])
    }
  }

  function checkIfRefresh() {
    cards.forEach(card => {
      if (card.refresh && dayjs().isAfter(card.refreshDate)) {
        changeCardStatus(card)
      }
    })
  }

  function deleteCardClickHandler(card) {
    const index = cards.indexOf(card)
    setCards([...cards.slice(0, index), ...cards.slice(index + 1)])
  }

  function saveCardClickHandler(formData, card) {
    const index = cards.indexOf(card)
    setCards([
      ...cards.slice(0, index),
      {
        ...cards[index],
        title: formData.title,
        tags: formData.tags,
        notes: formData.notes,
      },
      ...cards.slice(index + 1),
    ])
  }

  return (
    <Router>
      <React.Fragment>
        <Helmet>
          <title>VIDEQ</title>
          <meta
            name="description"
            content="Learn videos with VIDEQ: your app to keep track of learned videos. Check it out now!"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Dosis:700|Roboto:400,700"
            rel="stylesheet"
          />
        </Helmet>
        <Route
          path="/"
          exact
          render={({ history }) => (
            <Grid>
              <Header history={history} />
              <PageTitle
                title={cards.length !== 0 ? 'Progress' : null}
                status={''}
              />
              <Dashboard
                showLogo={showLogo}
                setShowLogo={setShowLogo}
                cards={cards}
              />
              <Nav status={''} />
            </Grid>
          )}
        />
        <Route
          path="/add/id"
          render={({ history }) => (
            <AddIdPage cards={cards} history={history} onSubmit={createCard} />
          )}
        />
        <Route
          path="/add/playlist"
          render={({ history }) => (
            <AddPlaylistPage
              cards={cards}
              setCards={setCards}
              history={history}
            />
          )}
        />
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
          path="/category"
          render={({ history }) => (
            <CategoryPage history={history} checkIfRefresh={checkIfRefresh} />
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
              onVideoStateChange={videoStateChangeHandler}
              status={
                cards.find(card => card.id === match.params.id).status || null
              }
              id={match.params.id}
              card={cards.find(card => card.id === match.params.id) || []}
              onDeleteCardClick={deleteCardClickHandler}
              onSaveCardClick={saveCardClickHandler}
              cards={cards}
              setCards={setCards}
            />
          )}
        />
        <GlobalStyle />
      </React.Fragment>
    </Router>
  )
}
