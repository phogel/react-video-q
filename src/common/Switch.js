import React, { useState } from 'react'
import styled from 'styled-components'

const StyledSwitch = styled.div`
  margin-left: 30px;
  font-size: 15px;
  > * {
    user-select: none;
    :focus {
      outline: none;
    }
  }
  .switch-input {
    display: none;
  }
  .switch-label {
    position: relative;
    display: inline-block;
    cursor: pointer;
    padding: 0 30px 0 44px;
  }
  .switch-label:before,
  .switch-label:after {
    content: '';
    position: absolute;
    margin: 0;
    outline: 0;
    top: 10px;
    left: 30px;
    transform: translate(0, -50%);
    transition: all 0.3s ease;
  }
  .switch-label:before {
    left: 1px;
    width: 34px;
    height: 14px;
    background-color: #b9b8b8;
    border-radius: 8px;
  }
  .switch-label:after {
    left: 0;
    width: 20px;
    height: 20px;
    background-color: #f1f1f1;
    border-radius: 50%;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.14),
      0 2px 2px 0 rgba(0, 0, 0, 0.098), 0 1px 5px 0 rgba(0, 0, 0, 0.084);
  }
  .switch-label .toggle--on {
    display: none;
  }
  .switch-label .toggle--off {
    display: inline-block;
    color: #b9b8b8;
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
  .pure-material-slider {
    --pure-material-safari-helper1: rgba(
      var(--pure-material-primary-rgb, 33, 150, 243),
      0.04
    );
    --pure-material-safari-helper2: rgba(
      var(--pure-material-primary-rgb, 33, 150, 243),
      0.12
    );
    --pure-material-safari-helper3: rgba(
      var(--pure-material-primary-rgb, 33, 150, 243),
      0.16
    );
    --pure-material-safari-helper4: rgba(
      var(--pure-material-primary-rgb, 33, 150, 243),
      0.24
    );
    display: inline-block;
    width: 100%;
    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.87);
  }

  /* Input */
  .pure-material-slider > input {
    -webkit-appearance: none;
    width: 90%;
    background-color: transparent;
    cursor: pointer;
  }

  /* Without Span */
  .pure-material-slider > input:last-child {
    position: static;
    margin: 0;
  }

  /* Focus */
  .pure-material-slider > input:focus {
    outline: none;
  }

  /* Disabled */
  .pure-material-slider > input:disabled {
    cursor: default;
    opacity: 0.38;
  }

  .pure-material-slider > input:disabled + span {
    color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
  }

  /* Webkit | Track */
  .pure-material-slider > input::-webkit-slider-runnable-track {
    margin: 16px;
    border-radius: 2px;
    height: 4px;
    background-color: #80e5d4;
  }

  /* Webkit | Thumb */
  .pure-material-slider > input::-webkit-slider-thumb {
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
`
export default function Switch({ state }) {
  const [daysBeforeRefresh, setDaysBeforeRefresh] = useState(0)

  function updateDaysBeforeRefresh(event) {
    setDaysBeforeRefresh(event.target.value)
  }

  return (
    <StyledSwitch>
      <input
        type="checkbox"
        id="switch"
        name="set-name"
        className="switch-input"
      />
      <label htmlFor="switch" className="switch-label">
        <span className="toggle--on">
          Move video automatically to refresh queue in{' '}
          <span style={{ fontWeight: 'bold', color: '#00cca9' }}>
            {daysBeforeRefresh | 0}
          </span>{' '}
          days
          <StyledSlider>
            <label className="pure-material-slider">
              <input
                value={daysBeforeRefresh}
                onChange={updateDaysBeforeRefresh}
                type="range"
                min="0"
                max="100"
              />
            </label>
          </StyledSlider>
        </span>
        <span className="toggle--off">
          Move video automatically to refresh queue in 0 days
          <StyledSlider>
            <label className="pure-material-slider">
              <input type="range" disabled min="0" max="100" />
            </label>
          </StyledSlider>
        </span>
      </label>
    </StyledSwitch>
  )
}
