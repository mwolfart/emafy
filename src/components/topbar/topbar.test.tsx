import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { BrowserRouter as Router } from 'react-router-dom'
import { user } from '../../fixtures/user'
import { strings } from 'strings'
import React from 'react'
import { Topbar } from './topbar'

describe('Topbar', () => {
  it('renders Topbar correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <Router>
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