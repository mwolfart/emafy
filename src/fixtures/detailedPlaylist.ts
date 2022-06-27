import { faker } from '@faker-js/faker'
import { DetailedPlaylist, MediaType } from 'types/media'
import { songs } from './songs'

export const detailedPlaylist: DetailedPlaylist = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  description: faker.lorem.sentences(),
  owner: faker.name.findName(),
  tracks: songs,
  totalTracks: songs.length,
  mediaType: MediaType.playlist,
}
