import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'

import { SubTitle } from './index'

describe('SubTitle', () => {
  it('renders SubTitle correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <SubTitle>Text</SubTitle>
      </ThemeProvider>,
    )
    const rectangleElement = screen.getByText('Text')
    expect(rectangleElement).toBeTruthy()
  })
})
