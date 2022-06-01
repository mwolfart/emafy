import { User } from 'types/media'
import { PlaybackSDK } from 'types/playbackSDK'

export const emptyUser: User = {
  country: '',
  name: '',
  email: '',
  id: '',
  images: [],
  followerCount: 0,
}

export const emptyPlackbackSDK: PlaybackSDK = {
  togglePlay: () => new Promise(() => {}),
  resume: () => new Promise(() => {}),
  pause: () => new Promise(() => {}),
  connect: () => new Promise(() => true),
  getCurrentState: () => new Promise(() => {}),
  getVolume: () => new Promise(() => 0),
  setVolume: () => new Promise(() => {}),
  seek: () => new Promise(() => {}),
  previousTrack: () => new Promise(() => {}),
  nextTrack: () => new Promise(() => {}),
  addListener: () => true,
}
