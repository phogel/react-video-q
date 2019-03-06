import React, { useState } from 'react'
import Card from '../cards/Card.js'
import GlobalStyle from './GlobalStyle'
import { Helmet } from 'react-helmet'
import CardsContainer from '../cards/CardsContainer'
import CardDetailPage from '../cards/CardDetailPage'
import uid from 'uid'
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
      id: uid(),
      backgroundImageUrl: 'http://via.placeholder.com/500x300/',
    },
    {
      title: 'Title2',
      tags: ['tag1', 'tag2', 'tag3'],
      notes:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: uid(),
      backgroundImageUrl: 'http://via.placeholder.com/500/',
    },
    {
      title: 'Title3',
      tags: ['tag1', 'tag2', 'tag3'],
      notes:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: uid(),
      backgroundImageUrl: 'http://via.placeholder.com/500/',
    },
    {
      title: 'Title4',
      tags: ['tag1', 'tag2', 'tag3'],
      notes:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: uid(),
      backgroundImageUrl: 'http://via.placeholder.com/500/',
    },
    {
      title: 'Title5',
      tags: ['tag1', 'tag2', 'tag3'],
      notes:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: uid(),
      backgroundImageUrl: 'http://via.placeholder.com/500/',
    },
    {
      title: 'Title6',
      tags: ['tag1', 'tag2', 'tag3'],
      notes:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: uid(),
      backgroundImageUrl: 'http://via.placeholder.com/500/',
    },
    {
      title: 'Title7',
      tags: ['tag1', 'tag2', 'tag3'],
      notes:
        'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
      uploadDate: '2019-03-05T10:51',
      id: uid(),
      backgroundImageUrl: 'http://via.placeholder.com/500/',
    },
  ])

  return (
    <Router>
      <React.Fragment>
        <Helmet>
          <title>video-q</title>
          <meta
            name="Learn videos with video-q"
            content="Your app to keep track of learned videos"
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
                {cards.map(card => (
                  <Card
                    title={card.title}
                    tags={card.tags}
                    backgroundImageUrl={card.backgroundImageUrl}
                    id={card.id}
                    uploadDate={card.uploadDate}
                    key={card.id}
                  />
                ))}
              </CardsContainer>
            </Grid>
          )}
        />
        <Route
          path="/videos/:id"
          render={({ match }) => (
            <CardDetailPage
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
