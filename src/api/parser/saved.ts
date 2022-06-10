import { SavedAlbum, SavedTrack } from 'api/types/savedMedia'
import { Album, Song } from 'types/media'
import { parseAlbum } from './album'
import { parseTrack } from './track'

export const parseSavedAlbums = (
  savedAlbums: Array<SavedAlbum>,
): Array<Album> => savedAlbums.map(({ album }) => parseAlbum(album))

export const parseSavedTracks = (savedTracks: Array<SavedTrack>): Array<Song> =>
  savedTracks.map(({ track }) => parseTrack(track))
