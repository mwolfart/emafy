import { Album, MediaType } from 'types/media'

const faker = require('faker')
let nextId = 0

export let albums: Album[] = []
for (let i = 0; i < 10; i++) {
  albums.push({
    id: (nextId++).toString(),
    name: faker.name.findName(),
    artists: [
      {
        id: (nextId++).toString(),
        name: faker.name.findName(),
        type: MediaType.artist,
      },
      {
        id: (nextId++).toString(),
        name: faker.name.findName(),
        type: MediaType.artist,
      },
    ],
    totalTracks: 10,
    type: MediaType.album,
  })
}
