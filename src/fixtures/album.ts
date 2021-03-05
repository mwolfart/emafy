import { Album, MediaType } from 'types/media'
import faker from 'faker'

export const album: Album = {
  id: '1',
  name: faker.name.findName(),
  artists: [
    { id: '2', name: faker.name.findName(), type: MediaType.artist },
    { id: '3', name: faker.name.findName(), type: MediaType.artist },
  ],
  totalTracks: 10,
  type: MediaType.album,
}
