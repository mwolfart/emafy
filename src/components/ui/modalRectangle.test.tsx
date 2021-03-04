import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import faker from 'faker'

import { ModalRectangle } from './index'

describe('ModalRectangle', () => {
  it('renders ModalRectangle correctly', () => {
    const text = faker.random.words()
    render(
      <ThemeProvider theme={mainStyles}>
        <ModalRectangle>{text}</ModalRectangle>
      </ThemeProvider>,
    )
    const rectangleElement = screen.getByText(text)
    expect(rectangleElement).toBeTruthy()
  })
})
