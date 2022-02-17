import { VFC } from 'react'
import styled from 'styled-components'

type Props = {
  iconClass: string
  isLarge: boolean
  onClick: () => void
}

type StyledProps = {
  isLarge: boolean
}

const Button = styled.div<StyledProps>`
  ${({ isLarge, theme }) => `
    margin: ${theme.divSpacingSmall};
    padding: ${isLarge ? '25px' : '18px'};
    box-shadow: ${theme?.shadowDimensionsDefault};
    border-radius: ${isLarge ? '50px' : '36px'};
    cursor: pointer;
    display: flex;
  `}
`

const Icon = styled.i`
  ${({ theme }) => `
    text-align: right;
    font-size: ${theme.fontSizeIcon};
    color: ${theme.palette.colorTextDisabled};
  `}
`

export const PlayerButton: VFC<Props> = ({ iconClass, isLarge, onClick }) => {
  return (
    <Button isLarge={isLarge} onClick={onClick}>
      <Icon className={'fa ' + iconClass + ' fa-2x'} />
    </Button>
  )
}
