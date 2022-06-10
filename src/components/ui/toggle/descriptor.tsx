import { FC } from 'react'
import styled from 'styled-components'
import { Toggle } from './toggle'

interface Props {
  toggleState: boolean
  onChangeCallback: (value: boolean) => void
  isOnOff?: boolean
  labelTrue?: string
  labelFalse?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  @media (max-width: 576px) {
    display: none;
  }
`

const Label = styled.div`
  ${({ theme }) => `
    font-family: ${theme?.fontStyle};
    font-weight: ${theme?.fontBoldOne};
    font-size: ${theme?.fontSizeParagraph};
    padding: 0 ${theme?.divSpacingSmall};
  `}
`

export const Descriptor: FC<Props> = ({
  toggleState,
  onChangeCallback,
  isOnOff,
  labelFalse,
  labelTrue,
}) => {
  return (
    <Wrapper>
      {labelFalse ? <Label>{labelFalse}</Label> : ''}
      <Toggle
        onChangeCallback={onChangeCallback}
        toggleState={toggleState}
        isOnOff={isOnOff}
      />
      {labelTrue ? <Label>{labelTrue}</Label> : ''}
    </Wrapper>
  )
}
