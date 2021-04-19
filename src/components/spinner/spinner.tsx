import styled, { useTheme } from 'styled-components'
import { mainStyles, Styles } from 'styles'
import { GlobalProps as StyledProps } from 'types/global'
import BeatLoader from 'react-spinners/BeatLoader'
import { VFC } from 'react'

const SpinnerWrapper = styled.div`
  ${({ theme = mainStyles }: StyledProps) => `
    padding: ${theme.divSpacingBig};
    text-align: center;
  `}
`

export const SpinnerCenterPadding: VFC = () => {
  const theme = useTheme() as Styles

  return (
    <SpinnerWrapper>
      <BeatLoader color={theme.palette.colorPrimary} />
    </SpinnerWrapper>
  )
}
