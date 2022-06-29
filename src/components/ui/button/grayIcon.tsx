import { CleanButton } from 'components/ui'
import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  iconClass: string
  onClickCallback: () => void
  ariaLabel?: string
  title?: string
  hasRoundBorder?: boolean
  iconSize?: string
}

interface IconProps {
  hasRoundBorder?: boolean
  iconSize?: string
}

const Icon = styled.i<IconProps>`
  ${({ hasRoundBorder, iconSize, theme }) =>
    `
    text-align: right;
    color: ${theme.palette.colorGray600};
    text-align: center;
    ` +
    (iconSize ? `font-size: ${iconSize}` : '') +
    (hasRoundBorder
      ? `
        border: 3px solid #ddd;
        border-radius: calc(2 * ${theme.divSpacingSmall});
        padding: ${theme.divSpacingSmall};
        width: ${iconSize || 'auto'};
      `
      : '')}
`

const PaddedText = styled.div`
  ${({ theme }) => `
    padding-left: ${theme.divSpacingSmall};
    color: ${theme.palette.colorTextTitle};
  `}
`

export const GrayIconButton: FC<Props> = ({
  iconClass,
  onClickCallback,
  ariaLabel,
  title,
  hasRoundBorder,
  iconSize,
}) => (
  <CleanButton
    onClick={onClickCallback}
    aria-label={ariaLabel}
    aria-hidden={!ariaLabel}
  >
    <Icon
      className={'fa ' + iconClass}
      iconSize={iconSize}
      hasRoundBorder={hasRoundBorder}
    />
    {title && <PaddedText>{title}</PaddedText>}
  </CleanButton>
)
