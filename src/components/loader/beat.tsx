import { mainPalette } from 'palette'
import { VFC } from 'react'
import { BeatLoader } from 'react-spinners'
import styled from 'styled-components'

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    margin: ${theme.divSpacingBig};
  `}
`

export const CustomBeatLoader: VFC = () => {
  return (
    <Wrapper>
      <BeatLoader color={mainPalette.colorPrimary} loading={true} />
    </Wrapper>
  )
}
