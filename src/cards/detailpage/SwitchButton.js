import React, { useState } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

const StyledSwitchButton = styled.div`
  font-size: 15px;
  z-index: 10;
  user-select: none;
  &:focus {
    outline: none;
  }
  > * {
    user-select: none;
    &:focus {
      outline: none;
    }
  }
  .switch-input {
    display: none;
  }
  .switch-label {
    position: relative;
    user-select: none;
    &:focus {
      outline: none;
    }
    display: inline-block;
    cursor: pointer;
    padding: 0 30px 0 44px;

    :before,
    :after {
      content: '';
      position: absolute;
      margin: 0;
      outline: 0;
      top: 10px;
      transform: translate(0, -50%);
      transition: all 0.3s ease;
    }
    :before {
      left: 1px;
      width: 34px;
      height: 14px;
      background-color: #b9b8b8;
      border-radius: 8px;
    }
    :after {
      left: 0;
      width: 20px;
      height: 20px;
      background-color: #f1f1f1;
      border-radius: 50%;
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.14),
        0 2px 2px 0 rgba(0, 0, 0, 0.098), 0 1px 5px 0 rgba(0, 0, 0, 0.084);
    }
    .toggle--on {
      display: none;
    }
    .toggle--off {
      display: inline-block;
      color: #b9b8b8;
    }
  }

  .switch-input:checked + .switch-label:before {
    background-color: #80e5d4;
  }
  .switch-input:checked + .switch-label:after {
    background-color: #00cca9;
    transform: translate(80%, -50%);
  }
  .switch-input:checked + .switch-label .toggle--on {
    display: inline-block;
  }
  .switch-input:checked + .switch-label .toggle--off {
    display: none;
  }
`

const StyledSlider = styled.div`
  > * {
    user-select: none;
  }

  .slider {
    display: inline-block;
    width: 100%;
    > input {
      -webkit-appearance: none;
      width: 90%;
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
          left: 62px;
        }
      }
      ::-webkit-slider-runnable-track {
        margin: 16px;
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
export default function SwitchButton({
  onSliderChange,
  onCheckboxClick,
  refresh,
  cardRefreshDate,
}) {
  const [firstRender, setFirstRender] = useState(true)
  const [daysBeforeRefresh, setDaysBeforeRefresh] = useState(10)

  function checkIfRefreshDate() {
    if (cardRefreshDate !== '') {
      return dayjs(cardRefreshDate).diff(dayjs(), 'day')
    }
  }

  function onSliderChangeHandler(event) {
    const refreshDate = dayjs().add(event.target.value, 'day')
    setDaysBeforeRefresh(event.target.value)
    setFirstRender(false)
    onSliderChange(refreshDate)
  }

  return (
    <StyledSwitchButton>
      <input
        type="checkbox"
        id="switch"
        name="set-name"
        className="switch-input"
        defaultChecked={refresh}
        onClick={onCheckboxClick}
      />
      <label htmlFor="switch" className="switch-label">
        <span className="toggle--on">
          Move video automatically to refresh queue in{' '}
          <span style={{ fontWeight: 'bold', color: '#00cca9' }}>
            {firstRender ? checkIfRefreshDate() : daysBeforeRefresh}
          </span>{' '}
          days
          <StyledSlider>
            <label className="slider">
              <input
                value={firstRender ? checkIfRefreshDate() : daysBeforeRefresh}
                onChange={onSliderChangeHandler}
                type="range"
                min="1"
                max="100"
              />
            </label>
          </StyledSlider>
        </span>
        <span className="toggle--off">
          Move video automatically to refresh queue in 0 days
          <StyledSlider>
            <label className="slider">
              <input type="range" disabled min="0" max="100" />
            </label>
          </StyledSlider>
        </span>
      </label>
    </StyledSwitchButton>
  )
}
