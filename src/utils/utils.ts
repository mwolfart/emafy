import { isAlbum, isArtist, isSong, Media } from 'types/media'

const calculateQuotientAndRemainder = (
  dividend: number,
  divisor: number,
): number[] => {
  const quotient = Math.floor(dividend / divisor)
  const remainder = dividend - quotient * divisor
  return [quotient, remainder]
}

export const renderSubTitle = (mediaInfo: Media): string => {
  if (
    isAlbum(mediaInfo) ||
    (isSong(mediaInfo) && mediaInfo.artists.length > 0)
  ) {
    return artistListToString(mediaInfo.artists)
  }
  if (isArtist(mediaInfo) && mediaInfo.genres.length > 0) {
    return genreListToString(mediaInfo.genres)
  }
  return ''
}

export const artistListToString = (artistList: Media[]): string =>
  artistList
    .map((artist: Media) => artist.name)
    .reduce((accum: string, name: string) => `${accum}, ${name}`)

export const genreListToString = (genreList: string[]): string => {
  const capitalizedGenres = genreList.map((genre: string) => capitalize(genre))
  return capitalizedGenres.reduce(
    (accum: string, genre: string) => `${accum}, ${genre}`,
  )
}

export const capitalize = (name: string): string => {
  const words = name.split(' ')
  const capitalizedWords = words.map(
    (word: string) => word[0].toUpperCase() + word.substring(1),
  )
  return capitalizedWords.join(' ')
}

export const formatDuration = (durationMs: number): string => {
  const secondMultiplier = 1000
  const minuteMultiplier = secondMultiplier * 60
  const hourMultiplier = minuteMultiplier * 60

  const [hours, restMin] = calculateQuotientAndRemainder(
    durationMs,
    hourMultiplier,
  )
  const [minutes, restSec] = calculateQuotientAndRemainder(
    restMin,
    minuteMultiplier,
  )
  const [seconds] = calculateQuotientAndRemainder(restSec, secondMultiplier)

  const localeProps = {
    minimumIntegerDigits: 2,
    useGrouping: false,
  }
  const time = [hours, minutes, seconds]
    .map((digits) => digits.toLocaleString('en-US', localeProps))
    .join(':')
  return time
}

export const formatTrackNumber = (number: number): string =>
  number.toString().padStart(2, '0')