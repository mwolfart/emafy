import { render, screen } from '@testing-library/react'
import { MediaImage } from './image'
import { defaultTheme } from 'theme'
import { ThemeProvider } from 'styled-components'
import { strings } from 'strings'

describe('Media Image', () => {
  it('renders component correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <MediaImage />
      </ThemeProvider>,
    )
    const element = screen.getByRole('img')
    expect(element).toBeInTheDocument()
  })

  it('renders component with placeholder correctly', () => {
    const placeholder = (
      <i
        className={`fas fa-times`}
        aria-label={strings.components.media.image.unavailable}
      />
    )

    render(
      <ThemeProvider theme={defaultTheme}>
        <MediaImage placeholder={placeholder} />
      </ThemeProvider>,
    )
    const element = screen.getByLabelText(
      strings.components.media.image.unavailable,
    )
    expect(element).toBeInTheDocument()
  })
})
