import { isAlbum, isArtist, isSong, Media } from 'types/media'

export const renderSubTitle = (mediaInfo: Media): string => {
  if (isAlbum(mediaInfo) || isSong(mediaInfo)) {
    return artistListToString(mediaInfo.artists)
  }
  if (isArtist(mediaInfo)) {
    return genreListToString(mediaInfo.genres)
  }
  return ''
}

const artistListToString = (artistList: Media[]): string =>
  artistList
    .map((artist: Media) => artist.name)
    .reduce((accum: string, name: string) => `${accum}, ${name}`)

const genreListToString = (genreList: string[]): string =>
  genreList.reduce((accum: string, genre: string) => `${accum}, ${genre}`)
