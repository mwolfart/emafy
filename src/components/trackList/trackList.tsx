import { VFC } from 'react'
import { Song } from 'types/media'
import { TrackCell } from './trackCell'
import { GlobalProps as StyledProps } from 'types/global'

type Props = {
  trackList: Array<Song>
} & StyledProps

export const TrackList: VFC<Props> = ({ trackList }) => (
  <>
    {trackList.map((track) => (
      <TrackCell track={track} />
    ))}
  </>
)
