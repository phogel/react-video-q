import React, { useState } from 'react'
import Card from '../cards/Card.js'
import GlobalStyle from './GlobalStyle'
import { Helmet } from 'react-helmet'
import CardsContainer from '../cards/CardsContainer'
import CardDetailPage from '../cards/CardDetailPage'
import CardsRender from '../cards/CardsRender'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  height: 100vh;
`

export default function App() {
  const [cards, setCards] = useState([
    {
      title: 'Title1',
      tags: ['tag1', 'tag2', 'tag3'],
      notes:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. ffi?Lorem, ipsum dolor sit amet consectetur dipisicing elit.',
      uploadDate: '2019-03-05T10:51',
      id: '1',
      backgroundImageUrl: 'http://via.placeholder.com/500x300/',
      status: 0,
    },
    {
      title: 'Title2',
      tags: ['tag1', 'tag2', 'tag3'],
      notes:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '2',
      backgroundImageUrl: 'http://via.placeholder.com/500/',
      status: 0,
    },
    {
      title: 'Title3',
      tags: ['tag1', 'tag2', 'tag3'],
      notes:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '3',
      backgroundImageUrl: 'http://via.placeholder.com/500/',
      status: 0,
    },
    {
      title: 'Title4',
      tags: ['tag1', 'tag2', 'tag3'],
      notes:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '4',
      backgroundImageUrl: 'http://via.placeholder.com/500/',
      status: 0,
    },
    {
      title: 'Title5',
      tags: ['tag1', 'tag2', 'tag3'],
      notes:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '5',
      backgroundImageUrl: 'http://via.placeholder.com/500/',
      status: 0,
    },
    {
      title: 'Title6',
      tags: ['tag1', 'tag2', 'tag3'],
      notes:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '6',
      backgroundImageUrl: 'http://via.placeholder.com/500/',
      status: 0,
    },
    {
      title: 'Title7',
      tags: ['tag1', 'tag2', 'tag3'],
      notes:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: '7',
      backgroundImageUrl: 'http://via.placeholder.com/500/',
      status: 0,
    },
  ])

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
