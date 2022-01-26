import { MediaType, DetailedArtist } from 'types/media'
import faker from 'faker'
import { artists } from './artists'

export const detailedArtist: DetailedArtist = {
  id: '0',
  name: faker.name.findName(),
  genres: [faker.music.genre(), faker.music.genre(), faker.music.genre()],
  popularity: Math.round(Math.random() * 100),
  followers: Math.round(Math.random() * 100000),
  mediaType: MediaType.artist,
  relatedArtists: artists,
  topTracks: [],
  currentUserFollows: true,
}
