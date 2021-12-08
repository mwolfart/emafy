import { FC } from 'react'
import styled from 'styled-components'
import { Toggle } from './toggle'

type Props = {
  toggleState: boolean
  onChangeCallback: (value: boolean) => void
  isOnOff?: boolean
  labelTrue?: string
  labelFalse?: string
}

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: row;
    align-items: center;
  `}
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
