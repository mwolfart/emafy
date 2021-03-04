import { isAlbum, isArtist, isSong, Media } from 'types/media'

export const renderSubTitle = (mediaInfo: Media): string => {
  if (isAlbum(mediaInfo) || isSong(mediaInfo)) {
    return mediaInfo.artists
      .map((artist: Media) => artist.name)
      .reduce((accum: string, name: string) => `${accum}, ${name}`)
  }
  if (isArtist(mediaInfo)) {
    return mediaInfo.genres.reduce(
      (accum: string, genre: string) => `${accum}, ${genre}`,
    )
  }
  return ''
}
