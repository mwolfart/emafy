import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'

import { Subtitle } from './index'

describe('Subtitle', () => {
  it('renders Subtitle correctly', () => {
    const faker = require('faker')
    const text = faker.random.words()
    render(
      <ThemeProvider theme={mainStyles}>
        <Subtitle>{text}</Subtitle>
      </ThemeProvider>,
    )
    const rectangleElement = screen.getByText(text)
    expect(rectangleElement).toBeTruthy()
  })
})
