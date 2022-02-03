import faker from 'faker'
import { MediaType, Song } from 'types/media'

let nextId = 0

export const songs: Song[] = []
for (let i = 0; i < 10; i++) {
  songs.push({
    id: (nextId++).toString(),
    name: faker.name.findName(),
    artists: [
      {
        id: (nextId++).toString(),
        name: faker.name.findName(),
        mediaType: MediaType.artist,
      },
    ],
    duration: Math.round(Math.random() * 100000),
    trackNumber: Math.round(Math.random() * 10),
    albumReference: '',
    mediaType: MediaType.song,
  })
}
