import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import faker from 'faker'
import { ModalRectangle } from '../index'

describe('ModalRectangle', () => {
  it('renders ModalRectangle correctly', () => {
    const text = faker.random.words()
    render(
      <ThemeProvider theme={defaultTheme}>
        <ModalRectangle>{text}</ModalRectangle>
      </ThemeProvider>,
    )
    const rectangleElement = screen.getByText(text)
    expect(rectangleElement).toBeInTheDocument()
  })
})
