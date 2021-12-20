import { Song, MediaType } from 'types/media'
import faker from 'faker'

let nextId = 0
const artistId = faker.datatype.number().toString()
const artistName = faker.name.findName()

export let albumTracks: Song[] = []
for (let i = 0; i < 10; i++) {
  albumTracks.push({
    id: (nextId++).toString(),
    name: faker.name.findName(),
    artists: [
      {
        id: artistId,
        name: artistName,
        mediaType: MediaType.artist,
      },
    ],
    duration: Math.round(Math.random() * 100000),
    trackNumber: i,
    albumReference: '',
    mediaType: MediaType.song,
  })
}
