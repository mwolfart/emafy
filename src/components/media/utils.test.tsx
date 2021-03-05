import { album } from 'fixtures/album'
import { artist } from 'fixtures/artist'
import { artistListToString, genreListToString, renderSubTitle } from './utils'

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
    const result = genreListToString(artist.genres)
    expect(result).toBe(
      `${artist.genres[0]}, ${artist.genres[1]}, ${artist.genres[2]}`,
    )
  })
})
