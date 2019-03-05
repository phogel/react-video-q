import React from 'react'
import Card from '../cards/Card.js'
import GlobalStyle from './GlobalStyle'
import { Helmet } from 'react-helmet'
import CardsContainer from '../cards/CardsContainer.js'

export default function App() {
  return (
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
      <CardsContainer>
        <Card />
        <Card backgroundImageUrl={'http://via.placeholder.com/500/'} />
      </CardsContainer>
      <GlobalStyle />
    </React.Fragment>
  )
}
