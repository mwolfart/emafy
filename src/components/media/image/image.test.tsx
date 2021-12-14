import { render, screen } from '@testing-library/react'
import { Image } from './image'
import { mainStyles } from 'styles'
import { ThemeProvider } from 'styled-components'
import { strings } from 'strings'

describe('Image', () => {
  it('renders Image correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <Image />
      </ThemeProvider>,
    )
    const element = screen.getByRole('img')
    expect(element).toBeInTheDocument()
  })

  it('renders Image with placeholder correctly', () => {
    const placeholder = (
      <i
        className={`fas fa-times`}
        aria-label={strings.components.media.image.unavailable}
      />
    )

    render(
      <ThemeProvider theme={mainStyles}>
        <Image placeholder={placeholder} />
      </ThemeProvider>,
    )
    const element = screen.getByLabelText(
      strings.components.media.image.unavailable,
    )
    expect(element).toBeInTheDocument()
  })
})
