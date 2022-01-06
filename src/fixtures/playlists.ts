import faker from 'faker'
import { MediaType, Playlist } from 'types/media'

let nextId = 0

export let playlists: Playlist[] = []
for (let i = 0; i < 10; i++) {
  playlists.push({
    id: (nextId++).toString(),
    name: faker.name.findName(),
    description: faker.lorem.sentences(),
    owner: faker.name.findName(),
    tracks: [
      {
        id: (nextId++).toString(),
        name: faker.name.findName(),
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
        duration: 1400000,
        mediaType: MediaType.song,
        trackNumber: 1,
        albumReference: '',
      },
    ],
    mediaType: MediaType.playlist,
  })
}
