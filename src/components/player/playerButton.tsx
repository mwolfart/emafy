import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  iconClass: string
  isLarge: boolean
  onClick: () => void
  ariaLabel?: string
  disabled?: boolean
}

interface StyledProps {
  isLarge?: boolean
  disabled?: boolean
}

const Button = styled.button<StyledProps>`
  ${({ isLarge, disabled, theme }) => `
    margin: 5px;
    padding: ${isLarge ? '16px' : '10px'};
    box-shadow: ${theme.shadowDimensionsDefault};
    border-radius: ${
      isLarge ? theme.borderRadiusExtraLarge : theme.borderRadiusLarge
    };
    cursor: ${disabled ? 'auto' : 'pointer'};
    display: flex;
    outline: none;
    border: none;
    background: ${theme.palette.colorWhite};

    @media (min-width: 576px) {
      margin: 10px;
      padding: ${isLarge ? '25px' : '18px'};
    }
  `}
`

const Icon = styled.i<StyledProps>`
  ${({ disabled, theme }) => `
    text-align: right;
    font-size: ${theme.fontSizeIcon};
    color: ${
      disabled ? theme.palette.colorGray100 : theme.palette.colorGray500
    };
  `}
`

export const PlayerButton: FC<Props> = ({
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
