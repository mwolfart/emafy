import { VFC } from 'react'
import styled from 'styled-components'
import { Button } from './default'

type Props = {
  icon: string
  onClickCallback: () => void
  title?: string
  resolutionToHideTitle?: string
}

type IProps = {
  resolutionToHideTitle?: string
}

const PaddedText = styled.div<IProps>`
  ${({ theme, resolutionToHideTitle = '576px' }) => `
    padding-left: ${theme.divSpacingSmall};

    @media (max-width: ${resolutionToHideTitle}) {
      display: none;
    }
  `}
`

export const IconButton: VFC<Props> = ({
  title,
  icon,
  onClickCallback,
  resolutionToHideTitle,
}) => (
  <Button square={!title} onClick={onClickCallback}>
    <i className={'fa ' + icon} />
    {title && (
      <PaddedText resolutionToHideTitle={resolutionToHideTitle}>
        {title}
      </PaddedText>
    )}
  </Button>
)
