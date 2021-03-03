import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'

import { Title } from './index'

describe('Title', () => {
  it('renders Title correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <Title>Text</Title>
      </ThemeProvider>,
    )
    const rectangleElement = screen.getByText('Text')
    expect(rectangleElement).toBeTruthy()
  })
})
