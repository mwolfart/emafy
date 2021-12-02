import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { artist } from 'fixtures/artist'
import { Follow } from './follow'
import { strings } from 'strings'

describe('Follow', () => {
  it('renders Follow correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <Follow follow={artist} isCurrentUserFollowing={true} />
      </ThemeProvider>,
    )

    const nameElement = screen.getByText(artist.name)
    const subtitleElement = screen.getByText(
      strings.components.profile.follow.view,
    )
    const buttonElement = screen.getByRole('button', {
      name: strings.components.profile.follow.following,
    })
    expect(nameElement).toBeInTheDocument()
    expect(subtitleElement).toBeInTheDocument()
    expect(buttonElement).toBeInTheDocument()
  })
})
