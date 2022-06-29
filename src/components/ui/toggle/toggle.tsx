import { ChangeEvent, FC, useState } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'

interface Props {
  toggleState: boolean
  onChangeCallback: (value: boolean) => void
  isOnOff?: boolean
}

interface StyledProps {
  isChecked: boolean
  isOnOff?: boolean
}

const Wrapper = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`

const Background = styled.div<StyledProps>`
  ${({ isOnOff, isChecked, theme }) => `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: ${theme.borderRadiusLarge};
    border-width: 0;
    background-color: ${
      isChecked
        ? theme.palette.colorPrimary
        : isOnOff
        ? theme.palette.colorGray100
        : theme.palette.colorSecondary
    };
    transition: ${theme.transitionQuick};
  
    &:before {
      position: absolute;
      content: '';
      width: 26px;
      height: 26px;
      top: 4px;
      left: 4px;
      border-radius: 13px;
      border-width: 0;
      background-color: #fff;
      transition: ${theme.transitionQuick};
      ${
        isChecked &&
        `
      transform: translateX(26px);
      `
      }
    }
  `}
`

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`

export const Toggle: FC<Props> = ({
  toggleState,
  onChangeCallback,
  isOnOff,
}) => {
  const [checked, setChecked] = useState(toggleState)
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setChecked(!checked)
    onChangeCallback(event.currentTarget.checked)
  }

  return (
    <Wrapper>
      <Input
        type="checkbox"
        onChange={onChange}
        defaultChecked={toggleState}
        aria-label={strings.ui.toggleView}
      />
      <Background isOnOff={isOnOff} isChecked={checked} />
    </Wrapper>
  )
}
