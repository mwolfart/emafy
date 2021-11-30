import { CleanButton } from 'components/ui'
import { VFC } from 'react'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'

type Props = {
  iconClass: string
  onClickCallback: () => void
  ariaLabel?: string
}

const Icon = styled.i`
  ${({ theme = mainStyles }: GlobalProps) => `
    text-align: right;
    font-size: ${theme.fontSizeIcon};
    color: ${theme.palette.colorTextDisabled};
  `}
`

export const IconButton: VFC<Props> = ({
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
