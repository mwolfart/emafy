import { CleanButton } from 'components/ui'
import { FC } from 'react'
import styled from 'styled-components'

type Props = {
  iconClass: string
  onClickCallback: () => void
  ariaLabel?: string
  title?: string
}

const Icon = styled.i`
  ${({ theme }) => `
    text-align: right;
    font-size: ${theme.fontSizeIcon};
    color: ${theme.palette.colorTextDisabled};
  `}
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
}) => (
  <CleanButton
    onClick={onClickCallback}
    aria-label={ariaLabel}
    aria-hidden={!ariaLabel}
  >
    <Icon className={'fa ' + iconClass + ' fa-2x'} />
    {title && <PaddedText>{title}</PaddedText>}
  </CleanButton>
)
