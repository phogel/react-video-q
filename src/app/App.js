import React from 'react'
import Card from '../cards/Card.js'
import GlobalStyle from './GlobalStyle'
import { Helmet } from 'react-helmet'

export default function App() {
  return (
    <React.Fragment>
      <Helmet>
        <title>video-q</title>
        <meta name="Learn videos with video-q" content="Your app to keep track of learned videos" />
        <meta name="theme-color" content="#008f68" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto"
          rel="stylesheet"
        />
      </Helmet>
      <Card />
      <GlobalStyle />
    </React.Fragment>
  )
}
