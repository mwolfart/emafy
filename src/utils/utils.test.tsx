import { album } from 'fixtures/album'
import { artist } from 'fixtures/artist'
import {
  abbreviateText,
  artistListToString,
  capitalize,
  formatDuration,
  formatTrackNumber,
  nameListToString,
  renderSubTitle,
} from './utils'

describe('RenderSubTitle', () => {
  it('RenderSubTitle produces correct output for album', () => {
    const result = renderSubTitle(album)
    expect(result).toBe(artistListToString(album.artists))
  })
})

describe('ArtistListToString', () => {
  it('ArtistListToString produces correct output for album', () => {
    const result = artistListToString(album.artists)
    expect(result).toBe(`${album.artists[0].name}, ${album.artists[1].name}`)
  })
})

describe('GenreListToString', () => {
  it('GenreListToString produces correct output for artist', () => {
    const result = nameListToString(artist.genres)
    expect(result).toBe(
      `${artist.genres[0]}, ${artist.genres[1]}, ${artist.genres[2]}`,
    )
  })
})

describe('Capitalize', () => {
  it('Capitalize produces correct output', () => {
    const result = capitalize('foo, bar baz')
    expect(result).toBe('Foo, Bar Baz')
  })
})

describe('FormatDuration', () => {
  it('FormatDuration produces correct output', () => {
    const duration = formatDuration(4515000)
    expect(duration).toBe('01:15:15')
  })
})

describe('FormatTrackNumber', () => {
  it('FormatTrackNumber produces correct output', () => {
    const trackNumberOneDigit = formatTrackNumber(2)
    expect(trackNumberOneDigit).toBe('02')
    const trackNumberTwoDigits = formatTrackNumber(12)
    expect(trackNumberTwoDigits).toBe('12')
  })
})

describe('AbbreviateText', () => {
  it('AbbreviateText produces correct output', () => {
    const longText = 'this is a long text'
    const unabbreviatedText = abbreviateText(longText, 50)
    expect(unabbreviatedText).toEqual(longText)
    const abbreviatedText = abbreviateText(longText, 10)
    expect(abbreviatedText).toEqual('this is...')
  })
})
