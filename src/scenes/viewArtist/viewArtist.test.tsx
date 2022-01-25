import { render, screen } from '@testing-library/react'
import { albums as mockedAlbums } from 'fixtures/albums'
import { StaticRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { ViewArtist } from './viewArtist'
import { createMemoryHistory, createLocation } from 'history'
import { detailedArtist as mockedDetailedArtist } from 'fixtures/detailedArtist'

jest.mock('hooks/useGetMediaList', () => ({
  useGetMediaList: () => ({
    fetchMoreMedia: jest.fn(),
    mediaList: mockedAlbums,
    nextURL: null,
    totalCount: mockedAlbums.length,
    isLoading: false,
  }),
}))

jest.mock('hooks/useGetArtistDetails', () => ({
  useGetArtistDetails: (id: number) => ({
    artistInfo: mockedDetailedArtist,
    setArtistInfo: jest.fn(),
    isLoading: false,
  }),
}))

describe('View Artist', () => {
  it('renders scene correctly', () => {
    const history = createMemoryHistory()
    const path = '/artist/:id'
    const match = {
      params: { id: '1' },
      isExact: true,
      path,
      url: path.replace(':id', '1'),
    }
    const location = createLocation(match.url)
    render(
      <ThemeProvider theme={defaultTheme}>
        <StaticRouter>
          <ViewArtist match={match} history={history} location={location} />
        </StaticRouter>
      </ThemeProvider>,
    )

    expect(screen.getByText(mockedDetailedArtist.name)).toBeInTheDocument()
    mockedAlbums.forEach((album) => {
      expect(screen.getAllByText(album.name).length).toBeGreaterThanOrEqual(1)
    })
    mockedDetailedArtist.topTracks.forEach((track) => {
      expect(screen.getAllByText(track.name).length).toBeGreaterThanOrEqual(1)
    })
  })
})
