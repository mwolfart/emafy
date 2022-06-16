import { faker } from '@faker-js/faker'
import { MediaType, Playlist } from 'types/media'

let nextId = 0

export const playlists: Playlist[] = []
for (let i = 0; i < 10; i++) {
  playlists.push({
    id: (nextId++).toString(),
    name: faker.name.findName(),
    description: faker.lorem.sentences(),
    owner: faker.name.findName(),
    mediaType: MediaType.playlist,
  })
}
