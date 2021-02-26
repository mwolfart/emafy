import { Album } from 'types/media'

const faker = require('faker')

export const album: Album = {
  id: '1',
  name: faker.name.findName(),
  artists: [
    { id: '2', name: faker.name.findName() },
    { id: '3', name: faker.name.findName() },
  ],
  totalTracks: 10,
}
