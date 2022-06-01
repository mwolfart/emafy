import { faker } from '@faker-js/faker'
import { PlaybackTrack, PlaybackState } from 'types/playbackSDK'

export const playbackTrack: PlaybackTrack = {
  id: faker.datatype.uuid(),
  name: faker.random.words(),
  album: {
    name: faker.random.words(),
    images: [],
  },
  artists: [faker.name.findName()],
}

export const playbackState: PlaybackState = {
  paused: true,
  position: 0,
  duration: 0,
  repeatMode: 0,
  shuffle: false,
  trackWindow: {
    currentTrack: playbackTrack,
    previousTracks: [],
    nextTracks: [],
  },
}
