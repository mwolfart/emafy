import { Album, MediaType } from 'types/media'
import { faker } from '@faker-js/faker'

export const album: Album = {
  id: '1',
  name: faker.name.findName(),
  artists: [
    { id: '2', name: faker.name.findName(), mediaType: MediaType.artist },
    { id: '3', name: faker.name.findName(), mediaType: MediaType.artist },
  ],
  totalTracks: 10,
  mediaType: MediaType.album,
}
