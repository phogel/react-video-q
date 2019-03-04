import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledCard = styled.div`
  padding: 18px 18px 0;
  border-radius: 20px;
  height: 300px;
  width: 300px;
  color: #fefdfd;
  display: grid;
  align-content: end;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  > h3 {
    font-size: 24px;
    margin: 0;
  }
`

const StyledTitle = styled.h3`
  display: block;
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const TagList = styled.ul`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 0;
`

const Tag = styled.li`
  display: inline-block;
  margin: 0 10px 10px 0;
  padding: 4px 8px;
  background: rgba(26, 26, 26, 0.57);
  border-radius: 10px;
  font-size: 0.75em;
`

Card.propTypes = {
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
}

Card.defaultProps = {
  title:
    'No title defined No title defined No title defined No title defined No title',
  backgroundImageUrl: 'https://i.ytimg.com/vi/-OcuDiZBW6c/maxresdefault.jpg',
  tags: ['No tags', 'defined', 'yet'],
}

export default function Card({ backgroundImageUrl, title, tags }) {
  function renderTag(text, index) {
    return <Tag key={index}>{text}</Tag>
  }

  return (
    <div css="padding: 10px 0 0; scroll-snap-align: start;">
      <StyledCard
        style={{ backgroundImage: 'url(' + backgroundImageUrl + ')' }}
      >
        <StyledTitle>{title}</StyledTitle>
        {tags && <TagList>{tags.map(renderTag)}</TagList>}
      </StyledCard>
    </div>
  )
}
