import faker from 'faker'
import { WebPlaybackTrack, WebPlaybackState } from 'types/playbackSDK'

export const playbackTrack: WebPlaybackTrack = {
  uri: faker.internet.url(),
  id: faker.datatype.uuid(),
  type: 'track',
  media_type: 'audio',
  name: faker.random.words(),
  is_playable: true,
  album: {
    uri: faker.internet.url(),
    name: faker.random.words(),
    images: [],
  },
  artists: [{ uri: faker.internet.url(), name: faker.name.findName() }],
}

export const playbackState: WebPlaybackState = {
  context: {
    uri: null,
    metadata: {},
  },
  disallows: {},
  paused: true,
  position: 0,
  duration: 0,
  repeat_mode: 0,
  shuffle: false,
  track_window: {
    current_track: playbackTrack,
    previous_track: [],
    next_tracks: [],
  },
}
