import { mainPalette } from 'palette'
import { VFC } from 'react'
import { BeatLoader } from 'react-spinners'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`

export const CustomBeatLoader: VFC = () => {
  return (
    <Wrapper>
      <BeatLoader color={mainPalette.colorPrimary} loading={true} />
    </Wrapper>
  )
}
