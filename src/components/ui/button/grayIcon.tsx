import { CleanButton } from 'components/ui'
import { VFC } from 'react'
import styled from 'styled-components'

type Props = {
  iconClass: string
  onClickCallback: () => void
  ariaLabel?: string
}

const Icon = styled.i`
  ${({ theme }) => `
    text-align: right;
    font-size: ${theme.fontSizeIcon};
    color: ${theme.palette.colorTextDisabled};
  `}
`

export const GrayIconButton: VFC<Props> = ({
  iconClass,
  onClickCallback,
  ariaLabel,
}) => (
  <CleanButton
    onClick={onClickCallback}
    aria-label={ariaLabel}
    aria-hidden={!ariaLabel}
  >
    <Icon className={'fa ' + iconClass + ' fa-2x'} />
  </CleanButton>
)
