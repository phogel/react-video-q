import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledCard = styled.div`
  padding: 18px 18px 0;
  border-radius: 20px;
  color: #fefdfd;
  display: grid;
  height: 300px;
  align-content: end;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  scroll-snap-align: start;
  animation: fade-in 20s;
  @keyframes fade-in {
    from {
      background-size: 200%;
    }
    to {
      background-size: 300%;
    }
  }
`

const StyledTitle = styled.h3`
  display: block;
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 24px;
  margin-bottom: 5px;
`

const TagList = styled.ul`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  overflow: scroll;
`

const Tag = styled.li`
  display: inline-block;
  margin: 0 8px 6px 0;
  padding: 4px 8px;
  background: rgba(26, 26, 26, 0.57);
  border-radius: 10px;
  font-size: 0.75em;
  height: 22px;
`

Card.propTypes = {
  backgroundImageUrl: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
}

Card.defaultProps = {
  title: 'No title defined',
  backgroundImageUrl: 'https://i.ytimg.com/vi/-OcuDiZBW6c/maxresdefault.jpg',
  tags: [
    'No tags',
    'defined',
    'yet',
    'No tags',
    'defined',
    'yet',
    'No tags',
    'defined',
    'yet',
  ],
}

export default function Card({ backgroundImageUrl, title, tags }) {
  function renderTag(text, index) {
    return <Tag key={index}>{text}</Tag>
  }

  return (
    <StyledCard
      style={{
        backgroundImage: 'url(' + backgroundImageUrl + ')',
      }}
    >
      <StyledTitle>{title}</StyledTitle>
      {tags && <TagList>{tags.map(renderTag)}</TagList>}
    </StyledCard>
  )
}
