import { Song, MediaType } from 'types/media'
import { faker } from '@faker-js/faker'

export const song: Song = {
  id: '1',
  name: faker.name.findName(),
  artists: [
    { id: '2', name: faker.name.findName(), mediaType: MediaType.artist },
    { id: '3', name: faker.name.findName(), mediaType: MediaType.artist },
  ],
  duration: 1400000,
  mediaType: MediaType.song,
  trackNumber: 1,
  albumReference: '',
}
