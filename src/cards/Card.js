import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Icon from '../common/Icon'
import youTubeImage from '../images/youtube.png'

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
  background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 59%,
      rgba(${p => p.cardFade}) 100%
    ),
    url(${p => p.backgroundImageUrl}) no-repeat;
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
  backgroundImageUrl: youTubeImage,
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

const iconFill = ['#EFA5D4', '#00CCA9', '#FF328B']
const iconName = ['learning-queue', 'learned', 'refresh-queue']
const cardFade = ['239,165,212,0.65', '0,204,169,0.65', '255,50,139,0.65']

export default function Card({ details }) {
  function renderTag(text, index) {
    return <Tag key={index}>{text}</Tag>
  }

  function selectFade() {
    if (details.status === 0) {
      return '0, 0, 0, 0.65'
    }
    return cardFade[details.status - 1]
  }

  function selectIcon() {
    if (details.status === 0) {
      return ''
    }
    return (
      <StyledIcon
        fill={iconFill[details.status - 1]}
        height="30px"
        width="50px"
        name={iconName[details.status - 1]}
      />
    )
  }

  return (
    <StyledLink to={`/videos/${details.id}`}>
      <StyledCard
        className={'card'}
        backgroundImageUrl={details.backgroundImageUrl}
        cardFade={selectFade}
      >
        {selectIcon()}
        <StyledTitle>{details.title}</StyledTitle>
        {details.tags && <TagList>{details.tags.map(renderTag)}</TagList>}
      </StyledCard>
    </StyledLink>
  )
}
