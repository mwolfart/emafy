import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  setVolume: (value: number) => void
  currentVolume: number
}

const Wrapper = styled.div`
  ${({ theme }) => `
    display: none;
    position: absolute;
    right: ${theme.divDistanceMedium};
    box-shadow: ${theme.shadowDimensionsDefault};
    padding: ${theme.divSpacingMedium} ${theme.divSpacingBig};
    border-radius: ${theme.borderRadiusLarge};

    @media (min-width: 768px) {
      display: block;
    }
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
    height: ${theme.inputSliderHeight};
    outline: none;
    opacity: 0.7;
    overflow: hidden;
    transition: opacity ${theme.transitionQuick};
    -webkit-appearance: none;

    &:hover {
      opacity: 1;
    }

    &::-webkit-slider-runnable-track {
      width: 100%;
      height: ${theme.inputSliderHeight};
      background: ${theme.palette.colorGray500};
      border: none;
      border-radius: ${theme.inputSliderBorderRadius};
      overflow: hidden;
    }

    &::-webkit-slider-thumb {
      width: 0;
      -webkit-appearance: none;
      height: ${theme.inputSliderHeight};
      box-shadow: ${theme.inputSliderShadow} ${theme.palette.colorPrimary};
    }

    &::-moz-range-progress {
      background-color: ${theme.palette.colorPrimary}; 
    }

    &::-moz-range-track {  
      background-color: ${theme.palette.colorGray500};
    }

    &::-moz-range-thumb {
      -webkit-appearance: none;
      -moz-appearance: none;
      -moz-border-radius: ${theme.inputSliderHeight};
      height: ${theme.inputSliderThumbSize};
      width: ${theme.inputSliderThumbSize};
      background: ${theme.palette.colorPrimary};
      border: none;
    }

    &::-ms-fill-lower {
      background-color: ${theme.palette.colorPrimary}; 
    }

    &::-ms-fill-upper {  
      background-color: ${theme.palette.colorGray500};
    }
  `}
`

export const PlayerVolumeControl: FC<Props> = ({
  setVolume,
  currentVolume,
}) => {
  const sliderChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = parseFloat(event.target.value) / 100
    setVolume(newValue)
  }
  return (
    <Wrapper>
      <SliderContainer>
        <InputSlider
          min="0"
          max="100"
          type="range"
          value={currentVolume * 100}
          onChange={sliderChange}
        />
      </SliderContainer>
    </Wrapper>
  )
}
