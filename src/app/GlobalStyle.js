import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
* {
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    margin: 0;
    background: rgb(250, 250, 250);
    color: #1A1A1A;
  }

  ul, ol {
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Dosis', sans-serif;
    margin: 0;
  }
`
