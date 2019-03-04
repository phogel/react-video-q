import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledCard = styled.section`
  padding: 18px 18px 0;
  border-radius: 20px;
  height: 300px;
  width: 300px;
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
  padding: 2px 6px;
  background: #333;
  border-radius: 6px;
  color: white;
  font-size: 0.8em;
`

Card.propTypes = {
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
}

Card.defaultProps = {
  title: 'No title defined',
  backgroundImageUrl: 'https://i.ytimg.com/vi/-OcuDiZBW6c/maxresdefault.jpg',
  tags: ['No', 'tags', 'defined'],
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
        <h3>{title}</h3>
        {tags && <TagList>{tags.map(renderTag)}</TagList>}
      </StyledCard>
    </div>
  )
}
