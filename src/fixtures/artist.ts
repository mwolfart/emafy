import { SimpleArtist, MediaType } from 'types/media'
import faker from 'faker'

export const artist: SimpleArtist = {
  id: '0',
  name: faker.name.findName(),
  genres: [faker.music.genre(), faker.music.genre(), faker.music.genre()],
  popularity: Math.round(Math.random() * 100),
  followers: Math.round(Math.random() * 100000),
  type: MediaType.artist,
}
