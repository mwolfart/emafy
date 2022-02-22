import React, { VFC } from 'react'
import styled from 'styled-components'

type Props = {
  setVolume: (value: number) => void
}

const Wrapper = styled.div`
  ${({ theme }) => `
    position: absolute;
    right: 100px;
    box-shadow: ${theme?.shadowDimensionsDefault};
    padding: ${theme?.divSpacingMedium} ${theme.divSpacingBig};
    border-radius: 30px;
  `}
`

const SliderContainer = styled.div`
  width: 100%;
  margin: 0;
  display: flex;
`

const InputSlider = styled.input`
  ${({ theme }) => `
    width: 100%;
    height: 5px;
    outline: none;
    opacity: 0.7;
    overflow: hidden;
    transition: opacity 0.2s;
    -webkit-appearance: none;

    &:hover {
      opacity: 1;
    }

    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 5px;
      background: ${theme.palette.colorGray};
      border: none;
      border-radius: 3px;
      overflow: hidden;
    }

    &::-webkit-slider-thumb {
      width: 0;
      -webkit-appearance: none;
      height: 5px;
      box-shadow: -80px 0 0 80px ${theme.palette.colorPrimary};
    }

    &::-moz-range-progress {
      background-color: ${theme.palette.colorPrimary}; 
    }

    &::-moz-range-track {  
      background-color: ${theme.palette.colorGray};
    }

    &::-moz-range-thumb {
      -webkit-appearance: none;
      -moz-appearance: none;
      -moz-border-radius: 5px;
      height: 14px;
      width: 14px;
      background: ${theme.palette.colorPrimary};
      border: none;
    }

    &::-ms-fill-lower {
      background-color: ${theme.palette.colorPrimary}; 
    }

    &::-ms-fill-upper {  
      background-color: ${theme.palette.colorGray};
    }
  `}
`

export const PlayerVolumeSnippet: VFC<Props> = ({ setVolume }) => {
  const sliderChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = parseFloat(event.target.value) / 100
    setVolume(newValue)
  }
  return (
    <Wrapper>
      <SliderContainer>
        <InputSlider min="0" max="100" type="range" onChange={sliderChange} />
      </SliderContainer>
    </Wrapper>
  )
}
