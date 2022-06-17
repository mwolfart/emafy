import { SPOTIFY_ROUTE } from 'api/enum/spotifyRoute.enum'
import { parseDetailedPlaylist } from 'api/parser/playlist'
import { Method, spotifyInstance } from 'api/spotifyInstance'
import { RawPlaylistDetails } from 'api/types/media'
import { DetailedPlaylist } from 'types/media'

export const getPlaylist = (
  id: string,
): Promise<{ entities: DetailedPlaylist }> => {
  const route = `${SPOTIFY_ROUTE.PLAYLISTS}/${id}`
  return spotifyInstance<RawPlaylistDetails>(route, Method.GET).then(
    ({ data: playlist }) => {
      return {
        entities: parseDetailedPlaylist(playlist),
      }
    },
  )
}
