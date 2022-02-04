import { GrayIconButton } from 'components/ui'
import { VFC } from 'react'
import styled from 'styled-components'

type Props = {
  iconClass: string
  isLarge: boolean
  onClick: () => void
}

type StyledProps = {
  isLarge: boolean
}

const Wrapper = styled.div<StyledProps>`
  ${({ isLarge, theme }) => `
    margin: ${theme.divSpacingSmall};
    padding: ${isLarge ? '25px' : '18px'};
    box-shadow: ${theme?.shadowDimensionsDefault};
    border-radius: ${isLarge ? '50px' : '36px'};
  `}
`

export const PlayerButton: VFC<Props> = ({ iconClass, isLarge, onClick }) => {
  return (
    <Wrapper isLarge={isLarge}>
      <GrayIconButton iconClass={iconClass} onClickCallback={onClick} />
    </Wrapper>
  )
}
