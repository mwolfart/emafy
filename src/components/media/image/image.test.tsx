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
    expect(element).toBeTruthy()
  })

  it('renders Image with placeholder correctly', () => {
    const placeholder = (
      <i
        className={`fas fa-times`}
        aria-label={strings.components.mediaImage.noImage}
      />
    )

    render(
      <ThemeProvider theme={mainStyles}>
        <Image placeholder={placeholder} />
      </ThemeProvider>,
    )
    const element = screen.getByLabelText(strings.components.mediaImage.noImage)
    expect(element).toBeTruthy()
  })
})
