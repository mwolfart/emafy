import { isAlbum, isArtist, isSong, Media } from 'types/media'

const getQuotientAndRemainder = (
  dividend: number,
  divisor: number,
): number[] => {
  const quotient = Math.floor(dividend / divisor)
  const remainder = dividend - quotient * divisor
  return [quotient, remainder]
}

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
  const secondMultiplier = 1000
  const minuteMultiplier = secondMultiplier * 60
  const hourMultiplier = minuteMultiplier * 60

  const [hours, restMin] = getQuotientAndRemainder(durationMs, hourMultiplier)
  const [minutes, restSec] = getQuotientAndRemainder(restMin, minuteMultiplier)
  const [seconds] = getQuotientAndRemainder(restSec, secondMultiplier)

  const localeProps = {
    minimumIntegerDigits: 2,
    useGrouping: false,
  }
  const time = [hours, minutes, seconds]
    .map((digits) => digits.toLocaleString('en-US', localeProps))
    .join(':')
  return time
}
