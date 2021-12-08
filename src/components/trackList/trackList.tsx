import { VFC } from 'react'
import { Song } from 'types/media'
import { TrackCell } from './trackCell'

type Props = {
  trackList: Array<Song>
}

export const TrackList: VFC<Props> = ({ trackList }) => (
  <>
    {trackList.map((track) => (
      <TrackCell track={track} />
    ))}
  </>
)
