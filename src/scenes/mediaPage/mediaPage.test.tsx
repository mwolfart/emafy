import { faker } from '@faker-js/faker'
import { screen, render, waitFor } from '@testing-library/react'
import { albums } from 'fixtures/albums'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { Album, PagedDataList } from 'types/media'
import { MediaPage } from './mediaPage'

describe('Media Page', () => {
  const fetchMock = jest.fn(
    (): Promise<PagedDataList<Album>> =>
      Promise.resolve({ entities: albums, next: null, total: albums.length }),
  )

  it('renders scene headers correctly', async () => {
    const title = faker.random.words()
    const subtext = jest.fn((): string => faker.random.word())
    render(
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <MediaPage fetchFn={fetchMock} title={title} subtext={subtext} />
        </BrowserRouter>
      </ThemeProvider>,
    )
    await waitFor(() => expect(screen.getByText(title)).toBeTruthy())
    expect(subtext).toHaveBeenCalled()
    expect(fetchMock).toHaveBeenCalled()
  })

  it('renders media list correctly', async () => {
    const title = faker.random.words()
    const subtext = (): string => faker.random.word()
    render(
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <MediaPage fetchFn={fetchMock} title={title} subtext={subtext} />
        </BrowserRouter>
      </ThemeProvider>,
    )
    await waitFor(() => expect(screen.getByText(title)).toBeTruthy())
    albums.forEach((album) => {
      const albumElement = screen.getByText(album.name)
      expect(albumElement).toBeTruthy()
    })
  })
})
