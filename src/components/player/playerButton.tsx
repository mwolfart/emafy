import { VFC } from 'react'
import styled from 'styled-components'

type Props = {
  iconClass: string
  isLarge: boolean
  onClick: () => void
  disabled?: boolean
}

type StyledProps = {
  isLarge?: boolean
  disabled?: boolean
}

const Button = styled.div<StyledProps>`
  ${({ isLarge, disabled, theme }) => `
    margin: ${theme.divSpacingSmall};
    padding: ${isLarge ? '25px' : '18px'};
    box-shadow: ${theme?.shadowDimensionsDefault};
    border-radius: ${isLarge ? '50px' : '36px'};
    cursor: ${disabled ? 'auto' : 'pointer'};
    display: flex;
  `}
`

const Icon = styled.i<StyledProps>`
  ${({ disabled, theme }) => `
    text-align: right;
    font-size: ${theme.fontSizeIcon};
    color: ${
      disabled ? theme.palette.colorBackgroundDisabled : theme.palette.colorGray
    };
  `}
`

export const PlayerButton: VFC<Props> = ({
  iconClass,
  isLarge,
  onClick,
  disabled,
}) => (
  <Button isLarge={isLarge} onClick={onClick}>
    <Icon className={'fa ' + iconClass + ' fa-2x'} disabled={disabled} />
  </Button>
)
