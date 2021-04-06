import { Album, MediaType } from 'types/media'
import faker from 'faker'

let nextId = 0

export let albums: Album[] = []
for (let i = 0; i < 10; i++) {
  const noImageRandomSelector = Math.random() * 10 <= 1

  albums.push({
    id: (nextId++).toString(),
    name: faker.random.words(),
    artists: [
      {
        id: (nextId++).toString(),
        name: faker.name.findName(),
        mediaType: MediaType.artist,
      },
      {
        id: (nextId++).toString(),
        name: faker.name.findName(),
        mediaType: MediaType.artist,
      },
    ],
    totalTracks: 10,
    mediaType: MediaType.album,
    images: noImageRandomSelector
      ? []
      : [
          `${faker.image.abstract()}?random=${Math.round(
            Math.random() * 1000,
          )}`,
        ],
  })
}
