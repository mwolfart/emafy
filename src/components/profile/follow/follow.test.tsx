import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { artist } from 'fixtures/artist'
import { Follow } from './follow'

describe('Follow', () => {
  it('renders Follow correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <Follow follow={artist} />
      </ThemeProvider>,
    )

    const nameElement = screen.getByText(artist.name)
    const subtitleElement = screen.getByText('View artist')
    const buttonElement = screen.getByRole('button', {
      name: 'Following',
    })
    expect(nameElement).toBeInTheDocument()
    expect(subtitleElement).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()
  })
})
