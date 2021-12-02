import { fireEvent, render, screen } from '@testing-library/react'
import { albums } from 'fixtures/albums'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { BrowserRouter as Router } from 'react-router-dom'
import { SavedMedia } from './savedMedia'
import { strings } from 'strings'

describe('SavedMedia', () => {
  it('renders SavedMedia correctly', () => {
    const albumList = albums
    const title = strings.scenes.albums.mySavedAlbums
    const countLabel = strings.scenes.albums.subtextAlbums

    render(
      <ThemeProvider theme={mainStyles}>
        <Router>
          <SavedMedia
            changeView={() => {}}
            fetchMoreMedia={() => {}}
            isTransitioning={false}
            isViewList={true}
            mediaCountLabel={countLabel}
            mediaList={albumList}
            mediaTitle={title}
            nextURL={null}
            totalCount={albumList.length}
          />
        </Router>
      </ThemeProvider>,
    )

    const titleElement = screen.getByText(title)
    const subtitleElement = screen.getByText(
      `${albumList.length} ${countLabel}`,
    )
    const toggleElement = screen.getByRole('checkbox', {
      name: strings.components.toggleButton,
    })
    expect(titleElement).toBeInTheDocument()
    expect(subtitleElement).toBeInTheDocument()
    expect(toggleElement).toBeInTheDocument()
  })

  it('toggle callback is triggered correctly', () => {
    const albumList = albums
    const changeViewFn = jest.fn()
    const title = strings.scenes.albums.mySavedAlbums
    const countLabel = strings.scenes.albums.subtextAlbums

    render(
      <ThemeProvider theme={mainStyles}>
        <Router>
          <SavedMedia
            changeView={changeViewFn}
            fetchMoreMedia={() => {}}
            isTransitioning={false}
            isViewList={true}
            mediaCountLabel={countLabel}
            mediaList={albumList}
            mediaTitle={title}
            nextURL={null}
            totalCount={albumList.length}
          />
        </Router>
      </ThemeProvider>,
    )

    const inputElement = screen.getByRole('checkbox', {
      name: strings.components.media.toggleView,
    })
    fireEvent.click(inputElement)
    expect(changeViewFn).toHaveBeenCalledWith(false)
  })
})
