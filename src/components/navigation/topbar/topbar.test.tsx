import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { Router } from 'react-router-dom'
import { user } from 'fixtures/user'
import { createMemoryHistory } from 'history'
import { strings } from 'strings'
import { Topbar } from './topbar'

describe('Topbar', () => {
  it('renders component and props correctly', () => {
    const history = createMemoryHistory()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Router location={history.location} navigator={history}>
          <Topbar user={user} />
        </Router>
      </ThemeProvider>,
    )
    const nameElement = screen.getByText(user.name)
    const searchElement = screen.getByLabelText(
      strings.components.topbar.searchSong,
    )
    expect(nameElement).toBeInTheDocument()
    expect(searchElement).toBeInTheDocument()
  })
})
