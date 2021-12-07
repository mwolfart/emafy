import { VFC } from 'react'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'
import { Button } from './default'

type Props = {
  title?: string
  icon: string
  onClickCallback: () => void
}

const PaddedText = styled.div`
  ${({ theme = mainStyles }: GlobalProps) => `
    padding-left: ${theme.divSpacingSmall};
  `}
`

export const IconButton: VFC<Props> = ({ title, icon, onClickCallback }) => (
  <Button square={!title} onClick={onClickCallback}>
    <i className={'fa ' + icon} />
    {title && <PaddedText>{title}</PaddedText>}
  </Button>
)
