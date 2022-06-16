import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { SnippetTrack } from './track'
import { song } from 'fixtures/song'

describe('Snippet Track', () => {
  it('renders component and props correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <SnippetTrack track={song} />
      </ThemeProvider>,
    )
    const element = screen.getByText(song.name)
    expect(element).toBeInTheDocument()
  })
})
