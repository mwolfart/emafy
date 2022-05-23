import { faker } from '@faker-js/faker'
import { MediaType, SimpleArtist } from 'types/media'

let nextId = 0

export const artists: SimpleArtist[] = []
for (let i = 0; i < 10; i++) {
  artists.push({
    id: (nextId++).toString(),
    name: faker.name.findName(),
    genres: [faker.music.genre(), faker.music.genre(), faker.music.genre()],
    popularity: Math.round(Math.random() * 100),
    followers: Math.round(Math.random() * 100000),
    mediaType: MediaType.artist,
  })
}
