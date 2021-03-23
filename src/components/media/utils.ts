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

export const artistListToString = (artistList: Media[]): string =>
  artistList
    .map((artist: Media) => artist.name)
    .reduce((accum: string, name: string) => `${accum}, ${name}`)

export const genreListToString = (genreList: string[]): string =>
  genreList.reduce((accum: string, genre: string) => `${accum}, ${genre}`)

export const formatDuration = (durationMs: number): string => {
  const hourMultiplier = 1000 * 60 * 60
  const minuteMultiplier = 1000 * 60
  const secondMultiplier = 1000

  const hours = Math.floor(durationMs / hourMultiplier)
  durationMs -= hours * hourMultiplier
  const minutes = Math.floor(durationMs / minuteMultiplier)
  durationMs -= minutes * minuteMultiplier
  const seconds = Math.floor(durationMs / secondMultiplier)

  const localeProps = {
    minimumIntegerDigits: 2,
    useGrouping: false,
  }
  const hourLabel = hours.toLocaleString('en-US', localeProps)
  const minuteLabel = minutes.toLocaleString('en-US', localeProps)
  const secondLabel = seconds.toLocaleString('en-US', localeProps)
  return `${hourLabel}:${minuteLabel}:${secondLabel}`
}
