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
  setVolume: (value: number) => new Promise(() => {}),
  seek: (value: number) => new Promise(() => {}),
  previousTrack: () => new Promise(() => {}),
  nextTrack: () => new Promise(() => {}),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addListener: (name: string, foo: (params: any) => void) => true,
}
