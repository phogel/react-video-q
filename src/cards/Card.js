import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Icon from '../common/Icon'

const StyledLink = styled(Link)`
  text-decoration: none;
  user-select: none;
`

const StyledCard = styled.div`
  display: grid;
  position: relative;
  grid-template-rows: auto auto;
  align-content: end;
  height: 300px;
  padding: 18px 18px 6px;
  border-radius: 20px;
  color: #fefdfd;
  background-image: url(${p => p.backgroundImageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  scroll-snap-align: start;
`

const StyledTitle = styled.h3`
  display: block;
  width: 250px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 24px;
  margin-bottom: 5px;
  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
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

const StyledIcon = styled(Icon)`
  position: absolute;
  transform: translate(50%);
  right: 25px;
  top: 10px;
  height: 25px;
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

export default function Card({ backgroundImageUrl, title, tags, id, status }) {
  function renderTag(text, index) {
    return <Tag key={index}>{text}</Tag>
  }

  function selectIcon() {
    if (status === 0) {
      return ''
    } else if (status === 1) {
      return (
        <StyledIcon
          fill="#EFA5D4"
          height="30px"
          width="50px"
          name="learning-queue"
        />
      )
    } else if (status === 2) {
      return (
        <StyledIcon fill="#00CCA9" height="30px" width="50px" name="learned" />
      )
    } else if (status === 3) {
      return (
        <StyledIcon
          fill="#FF328B"
          height="30px"
          width="50px"
          name="refresh-queue"
        />
      )
    }
  }

  return (
    <StyledLink to={`/videos/${id}`}>
      <StyledCard className={'card'} backgroundImageUrl={backgroundImageUrl}>
        {selectIcon()}
        <StyledTitle>{title}</StyledTitle>
        {tags && <TagList>{tags.map(renderTag)}</TagList>}
      </StyledCard>
    </StyledLink>
  )
}
