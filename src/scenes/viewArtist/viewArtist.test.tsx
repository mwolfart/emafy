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

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
}))

describe('View Artist', () => {
  beforeEach(() => {
    const history = createMemoryHistory()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Router location={history.location} navigator={history}>
          <ViewArtist />
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
    const spy = jest.spyOn(ApiOwn, 'setFollowingArtist').mockResolvedValue('1')
    const btnElement = screen.getByRole('button', {
      name: strings.ui.unfollow,
    })
    fireEvent.click(btnElement)
    expect(spy).toHaveBeenCalled()
  })
})
