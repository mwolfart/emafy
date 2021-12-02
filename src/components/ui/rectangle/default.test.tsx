import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import faker from 'faker'
import { Rectangle } from './default'

describe('Rectangle', () => {
  it('renders Rectangle correctly', () => {
    const text = faker.random.words()
    render(
      <ThemeProvider theme={mainStyles}>
        <Rectangle>{text}</Rectangle>
      </ThemeProvider>,
    )
    const rectangleElement = screen.getByText(text)
    expect(rectangleElement).toBeInTheDocument()
  })
})
