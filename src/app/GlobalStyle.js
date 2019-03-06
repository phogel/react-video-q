import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    background: #fcfcfc;
    color: #1A1A1A;
  }

  h1, h2, h3, h4, h5, h6,
  ul, ol {
    margin: 0;
  }
`
