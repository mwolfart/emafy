import { fireEvent, render, screen } from '@testing-library/react'
import { albums as mockedAlbums } from 'fixtures/albums'
import { Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { ViewArtist } from './viewArtist'
import { createMemoryHistory } from 'history'
import { detailedArtist as mockedDetailedArtist } from 'fixtures/detailedArtist'
import { strings } from 'strings'
import * as ApiOwn from 'api/data/own'

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
  useGetArtistDetails: () => ({
    artistInfo: mockedDetailedArtist,
    setArtistInfo: jest.fn(),
    isLoading: false,
  }),
}))

describe('View Artist', () => {
  beforeEach(() => {
    const history = createMemoryHistory()
    const path = '/artist/:id'
    const match = {
      params: { id: '1' },
      isExact: true,
      path,
      url: path.replace(':id', '1'),
    }
    render(
      <ThemeProvider theme={defaultTheme}>
        <Router location={history.location} navigator={history}>
          <ViewArtist match={match} history={history} />
        </Router>
      </ThemeProvider>,
    )
  })

  it('renders scene correctly', () => {
    expect(screen.getByText(mockedDetailedArtist.name)).toBeInTheDocument()
    mockedAlbums.forEach((album) => {
      expect(screen.getAllByText(album.name).length).toBeGreaterThanOrEqual(1)
    })
    mockedDetailedArtist.topTracks.forEach((track) => {
      expect(screen.getAllByText(track.name).length).toBeGreaterThanOrEqual(1)
    })
  })

  it('clicking in follow button should toggle following artist', () => {
    const spy = jest.spyOn(ApiOwn, 'unfollowArtist').mockResolvedValue('1')
    const btnElement = screen.getByRole('button', {
      name: strings.scenes.artistDetail.unfollow,
    })
    fireEvent.click(btnElement)
    expect(spy).toHaveBeenCalled()
  })
})
