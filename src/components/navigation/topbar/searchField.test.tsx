import { render, screen } from '@testing-library/react'
import { strings } from 'strings'
import { SearchField } from './searchField'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'

describe('Search Field', () => {
  it('renders component correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <SearchField />
      </ThemeProvider>,
    )
    const element = screen.getByLabelText(strings.components.topbar.searchSong)
    expect(element).toBeInTheDocument()
  })
})
