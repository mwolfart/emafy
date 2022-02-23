import { VFC } from 'react'
import styled from 'styled-components'

type Props = {
  iconClass: string
  isLarge: boolean
  onClick: () => void
  ariaLabel?: string
  disabled?: boolean
}

type StyledProps = {
  isLarge?: boolean
  disabled?: boolean
}

const Button = styled.div<StyledProps>`
  ${({ isLarge, disabled, theme }) => `
    margin: ${theme.divSpacingSmall};
    padding: ${
      isLarge ? theme.divSpacingPlayerButtonLarge : theme.divSpacingPlayerButton
    };
    box-shadow: ${theme.shadowDimensionsDefault};
    border-radius: ${
      isLarge ? theme.borderRadiusExtraLarge : theme.borderRadiusLarge
    };
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
  ariaLabel,
  disabled,
}) => (
  <Button isLarge={isLarge} onClick={onClick} aria-label={ariaLabel}>
    <Icon className={'fa ' + iconClass + ' fa-2x'} disabled={disabled} />
  </Button>
)
