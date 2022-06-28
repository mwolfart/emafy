import { FC } from 'react'
import styled from 'styled-components'
import { Button } from './default'

interface Props {
  icon: string
  onClickCallback: () => void
  title?: string
  ariaLabel?: string
  resolutionToHideTitle?: string
}

interface StyledProps {
  resolutionToHideTitle?: string
}

const PaddedText = styled.div<StyledProps>`
  ${({ theme, resolutionToHideTitle = '576px' }) => `
    padding-left: ${theme.divSpacingSmall};

    @media (max-width: ${resolutionToHideTitle}) {
      display: none;
    }
  `}
`

export const IconButton: FC<Props> = ({
  title,
  icon,
  onClickCallback,
  ariaLabel,
  resolutionToHideTitle,
}) => (
  <Button square={!title} onClick={onClickCallback} aria-label={ariaLabel}>
    <i className={'fa ' + icon} />
    {title && (
      <PaddedText resolutionToHideTitle={resolutionToHideTitle}>
        {title}
      </PaddedText>
    )}
  </Button>
)
