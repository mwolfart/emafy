import { FC } from 'react'
import styled from 'styled-components'
import { GlobalProps } from 'types/props'
import { Toggle } from './toggle'

type Props = {
  toggleState: boolean
  onChangeCallback: (value: boolean) => void
  isOnOff?: boolean
  labelTrue?: string
  labelFalse?: string
} & GlobalProps

const Wrapper = styled.div<GlobalProps>`
  ${({ theme }: GlobalProps) => `
    display: flex;
    flex-direction: row;
    align-items: center;

    div {
      font-family: ${theme?.fontStyle};
      font-weight: ${theme?.fontBoldOne};
      font-size: ${theme?.fontSizeParagraph};
      padding: 0 10px;
    }
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
      {labelFalse ? <div>{labelFalse}</div> : ''}
      <Toggle
        onChangeCallback={onChangeCallback}
        toggleState={toggleState}
        isOnOff={isOnOff}
      />
      {labelTrue ? <div>{labelTrue}</div> : ''}
    </Wrapper>
  )
}
