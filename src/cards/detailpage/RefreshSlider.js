import React, { useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

const StyledSlider = styled.div`
  .slider {
    width: 110%;
    > input {
      -webkit-appearance: none;
      width: 100%;
      background-color: transparent;
      cursor: pointer;
      :focus {
        outline: none;
      }
      :disabled {
        cursor: default;
        opacity: 0.38;
        ::-webkit-slider-thumb {
          position: absolute;
          left: 50%;
        }
      }
      ::-webkit-slider-runnable-track {
        margin: 16px 32px 16px 0;
        border-radius: 2px;
        height: 4px;
        background-color: #80e5d4;
      }
      ::-webkit-slider-thumb {
        appearance: none;
        -webkit-appearance: none;
        border: none;
        border-radius: 50%;
        height: 3px;
        width: 3px;
        background-color: #00cca9;
        transform: scale(6, 6);
        transition: box-shadow 0.2s;
      }
    }
  }
`

export default function RefreshSlider({
  cardRefreshDate,
  onSliderChange,
  disabled,
}) {
  const [firstRender, setFirstRender] = useState(true)
  const [daysBeforeRefresh, setDaysBeforeRefresh] = useState(51)
  function checkForRefreshDate() {
    if (cardRefreshDate !== '') {
      return dayjs(cardRefreshDate).diff(dayjs(), 'day')
    }
    const refreshDate = dayjs().add(51, 'day')
    return daysBeforeRefresh && onSliderChange(refreshDate)
  }

  function onSliderChangeHandler(event) {
    const refreshDate = dayjs().add(event.target.value, 'day')
    setDaysBeforeRefresh(event.target.value)
    setFirstRender(false)
    onSliderChange(refreshDate)
  }

  return (
    <StyledSlider>
      <label className="slider">
        Move video automatically to refresh queue in{' '}
        {disabled ? (
          '50'
        ) : (
          <span style={{ fontWeight: 'bold', color: '#00cca9' }}>
            {firstRender ? checkForRefreshDate() : daysBeforeRefresh}
          </span>
        )}{' '}
        days
        <input
          disabled={disabled}
          defaultValue={firstRender ? checkForRefreshDate() : daysBeforeRefresh}
          onInput={onSliderChangeHandler}
          type="range"
          min="1"
          max="100"
        />
      </label>
    </StyledSlider>
  )
}
