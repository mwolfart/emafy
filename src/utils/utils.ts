import { isAlbum, isArtist, isPlaylist, isSong, Media } from 'types/media'

const calculateQuotientAndRemainder = (
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
    return nameListToString(mediaInfo.genres)
  }
  if (isPlaylist(mediaInfo)) {
    return `${mediaInfo.totalTracks} tracks`
  }
  return ''
}

export const artistListToString = (artistList: Media[]): string => {
  if (!artistList.length) {
    return ''
  }
  return artistList
    .map((artist: Media) => artist.name)
    .reduce((accum: string, name: string) => `${accum}, ${name}`)
}

export const nameListToString = (nameList: string[]): string => {
  if (!nameList.length) {
    return ''
  }
  const capitalizedNames = nameList.map((name: string) => capitalize(name))
  return capitalizedNames.reduce(
    (accum: string, name: string) => `${accum}, ${name}`,
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

export const abbreviateText = (text: string, maxChars: number): string => {
  if (text.length <= maxChars) {
    return text
  }
  return text.substring(0, maxChars - 3).concat('...')
}
