import { render, screen } from '@testing-library/react'
import { strings } from 'strings'
import { SearchField } from './searchField'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

describe('Search Field', () => {
  it('renders component correctly', () => {
    const history = createMemoryHistory()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Router location={history.location} navigator={history}>
          <SearchField />
        </Router>
      </ThemeProvider>,
    )
    const element = screen.getByLabelText(strings.components.topbar.searchSong)
    expect(element).toBeInTheDocument()
  })
})
