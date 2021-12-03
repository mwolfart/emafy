import { mainPalette } from 'palette'
import { VFC } from 'react'
import { BeatLoader } from 'react-spinners'

export const CustomBeatLoader: VFC = () => {
  return <BeatLoader color={mainPalette.colorPrimary} loading={true} />
}
