import styled from 'styled-components'
export default styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));
  align-content: flex-start;
  justify-content: space-around;
  grid-gap: 25px;
  padding: 25px 25px;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-padding: 25px;
  -webkit-overflow-scrolling: touch;
`
