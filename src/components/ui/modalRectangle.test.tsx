import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'

import { ModalRectangle } from './index'

describe('ModalRectangle', () => {
  it('renders ModalRectangle correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <ModalRectangle>Text</ModalRectangle>
      </ThemeProvider>,
    )
    const rectangleElement = screen.getByText('Text')
    expect(rectangleElement).toBeTruthy()
  })
})
