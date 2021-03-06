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
import NoCardsPage from '../cards/NoCardsPage'
import WelcomeLogo from './WelcomeLogo'

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
  const [player, setPlayer] = useState(null)
  const [isLoop, setIsLoop] = useState(false)

  useEffect(() => {
    saveCardsToStorage(cards)
  }, [cards])

  useEffect(() => {
    saveCardsToStorage(cards)
  }, [])

  function createCard(data) {
    setCards([...cards, data])
  }

  function categoryClickHandler(id, status) {
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

  function startSecondsChangeHandler(card, startSeconds) {
    const index = cards.indexOf(card)

    setCards([
      ...cards.slice(0, index),
      {
        ...card,
        startSeconds: startSeconds,
      },
      ...cards.slice(index + 1),
    ])
  }

  function endSecondsChangeHandler(card, endSeconds) {
    const index = cards.indexOf(card)
    setCards([
      ...cards.slice(0, index),
      {
        ...card,
        endSeconds: endSeconds,
      },
      ...cards.slice(index + 1),
    ])
  }

  function videoStateChangeHandler(event, card) {
    if (event.data === 1) {
      const index = cards.indexOf(card)
      if (index !== -1) {
        setCards([
          ...cards.slice(0, index),
          { ...card, lastSeenTime: dayjs() },
          ...cards.slice(index + 1),
        ])
      }
    }
  }

  function checkIfRefresh() {
    cards.forEach(card => {
      if (card.refresh && dayjs().isAfter(card.refreshDate)) {
        changeCardStatusToRefresh(card)
      }
    })
  }

  function changeCardStatusToRefresh(card) {
    const index = cards.indexOf(card)
    setCards([
      ...cards.slice(0, index),
      { ...card, status: 3, refresh: false, refreshDate: '' },
      ...cards.slice(index + 1),
    ])
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
        {showLogo ? (
          <WelcomeLogo showLogo={showLogo} setShowLogo={setShowLogo} />
        ) : null}
        <Route
          exact
          path="/"
          render={({ history }) => (
            <Grid>
              <Header history={history} cards={cards} />
              <PageTitle
                title={cards.length ? 'Not learned yet' : null}
                status={cards.length ? 0 : null}
              />
              {cards.length ? (
                <CardsContainer
                  hasLink={true}
                  checkIfRefresh={checkIfRefresh()}
                  cards={cards.filter(card => card.status === 0)}
                  showLogo={showLogo}
                  setShowLogo={setShowLogo}
                />
              ) : (
                <NoCardsPage
                  showLogo={showLogo}
                  setShowLogo={setShowLogo}
                  cards={cards}
                />
              )}

              <Nav status={0} />
            </Grid>
          )}
        />
        <Route
          path="/learningqueue"
          render={({ history }) => (
            <Grid>
              <Header history={history} cards={cards} />
              <PageTitle title="Learning queue" status={1} />
              <CardsContainer
                hasLink={true}
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
              <Header history={history} cards={cards} />
              <PageTitle title="Learned" status={2} />
              <CardsContainer
                hasLink={true}
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
              <Header history={history} cards={cards} />
              <PageTitle title="Refresh Queue" status={3} />
              <CardsContainer
                hasLink={true}
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
              onCheckboxClick={checkboxClickHandler}
              onSliderChange={sliderChangeHandler}
              onCategoryClick={categoryClickHandler}
              onVideoStateChange={videoStateChangeHandler}
              onStartSecondsChange={startSecondsChangeHandler}
              onEndSecondsChange={endSecondsChangeHandler}
              status={
                cards.find(card => card.id === match.params.id).status || null
              }
              id={match.params.id}
              card={cards.find(card => card.id === match.params.id) || []}
              onDeleteCardClick={deleteCardClickHandler}
              onSaveCardClick={saveCardClickHandler}
              cards={cards}
              setCards={setCards}
              player={player}
              setPlayer={setPlayer}
              isLoop={isLoop}
              setIsLoop={setIsLoop}
            />
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
                hasLink={true}
                checkIfRefresh={checkIfRefresh()}
                cards={searchWithinAllCards()}
              />
              <Nav status={''} />
            </Grid>
          )}
        />
        <GlobalStyle />
      </React.Fragment>
    </Router>
  )
}
