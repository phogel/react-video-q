import React from 'react'
import styled from 'styled-components'
import RefreshSlider from './RefreshSlider'

const StyledSwitchButton = styled.div`
  font-size: 15px;
  height: 0;
  margin-bottom: 48px;
  animation: fade-in 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: move-up 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes move-up {
    0% {
      transform: translateY(120px);
    }
    100% {
      transform: translateY(0);
    }
  }
  .switch-input {
    display: none;
  }
  .switch-label {
    position: relative;
    user-select: none;
    display: inline-block;
    cursor: pointer;
    padding: 0 10px 0 44px;

    :before,
    :after {
      content: '';
      position: absolute;
      margin: 0;
      top: 10px;
      outline: 0;
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

export default function SwitchButton({
  onSliderChange,
  onCheckboxClick,
  refresh,
  cardRefreshDate,
}) {
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
          <RefreshSlider
            onSliderChange={onSliderChange}
            cardRefreshDate={cardRefreshDate}
          />
        </span>
        <span className="toggle--off">
          <RefreshSlider disabled={true} />
        </span>
      </label>
    </StyledSwitchButton>
  )
}
