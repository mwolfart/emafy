import { CleanButton } from 'components/ui'
import { VFC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'

const Wrapper = styled.div`
  ${({ theme = mainStyles }: GlobalProps) => `
    flex-grow: 1;
    align-self: center;
    text-align: right;
  `}
`

const ChartButtonIcon = styled.i`
  ${({ theme = mainStyles }: GlobalProps) => `
    font-size: ${theme.fontSizeIcon};
    color: ${theme.palette.colorTextDisabled};
    padding: 0 ${theme.divSpacingSmall};
  `}
`

export const ChartButton: VFC = () => (
  <Wrapper>
    <CleanButton onClick={() => {}} aria-label={strings.components.chartButton}>
      <ChartButtonIcon className="fa fa-chart-line fa-2x" />
    </CleanButton>
  </Wrapper>
)
