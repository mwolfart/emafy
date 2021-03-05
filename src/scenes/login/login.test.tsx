import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'

import { LoginScene } from './login'

describe('Login', () => {
  it('renders Login scene correctly', () => {
    const { container } = render(
      <ThemeProvider theme={mainStyles}>
        <LoginScene />
      </ThemeProvider>,
    )
    expect(container.childElementCount).toBeTruthy()
  })
})
