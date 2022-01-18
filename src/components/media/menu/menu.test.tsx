import { fireEvent, render, screen } from '@testing-library/react'
import { albums } from 'fixtures/albums'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { BrowserRouter as Router } from 'react-router-dom'
import { MediaMenu } from './menu'
import { strings } from 'strings'

describe('MediaMenu', () => {
  it('renders MediaMenu correctly', () => {
    const albumList = albums

    render(
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <MediaMenu
            fetchMoreMedia={() => {}}
            mediaList={albumList}
            nextURL={null}
            totalCount={albumList.length}
          />
        </Router>
      </ThemeProvider>,
    )

    const toggleElement = screen.getByRole('checkbox', {
      name: strings.components.media.toggleView,
    })
    expect(toggleElement).toBeInTheDocument()
  })
})
