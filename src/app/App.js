import React, { useEffect, useState } from 'react'
import GlobalStyle from './GlobalStyle'
import { Helmet } from 'react-helmet'
import CardDetailPage from '../cards/detailpage/CardDetailPage'
import CardsContainer from '../cards/CardsContainer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'
import { getCardsFromStorage, saveCardsToStorage } from '../services'
import PageTitle from '../common/PageTitle'
import Nav from '../common/Nav'
import Header from '../common/Header'
import HeaderSearchBar from '../search/HeaderSearchBar'
import dayjs from 'dayjs'
import AddPage from '../add/AddPage'
import AddIdPage from '../add/id/AddIdPage'
import AddPlaylistPage from '../add/playlist/AddPlaylistPage'

const Grid = styled.section`
  display: grid;
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  grid-template-rows: 48px 20px auto 48px;
`

export default function App() {
  const [cards, setCards] = useState(getCardsFromStorage())

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
          render={({ history }) => (
            <Grid>
              <Header history={history} />
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
          render={({ history }) => (
            <Grid>
              <Header history={history} />
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
          render={({ history }) => (
            <Grid>
              <Header history={history} />
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
          render={({ history }) => (
            <Grid>
              <Header history={history} />
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
              onVideoStateChange={videoStateChangeHandler}
              status={
                cards.find(card => card.id === match.params.id).status || null
              }
              id={match.params.id}
              card={cards.find(card => card.id === match.params.id) || []}
              onDeleteCardClick={deleteCardClickHandler}
              onSaveCardClick={saveCardClickHandler}
            />
          )}
        />
        {/* <Route
          exact
          path="/add"
          render={({ history }) => <AddPage history={history} />}
        /> */}
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
        <GlobalStyle />
      </React.Fragment>
    </Router>
  )
}
