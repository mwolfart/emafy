import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'

import { Title } from './index'

describe('Title', () => {
  it('renders Title correctly', () => {
    const faker = require('faker')
    const text = faker.random.words()
    render(
      <ThemeProvider theme={mainStyles}>
        <Title>{text}</Title>
      </ThemeProvider>,
    )
    const rectangleElement = screen.getByText(text)
    expect(rectangleElement).toBeTruthy()
  })
})
