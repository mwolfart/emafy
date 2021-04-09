import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'

import { LoginScene } from './login'

describe('Login', () => {
  it('renders Login scene correctly', () => {
    const onLogin = jest.fn()
    const { container } = render(
      <ThemeProvider theme={mainStyles}>
        <LoginScene onLogin={onLogin} />
      </ThemeProvider>,
    )
    expect(onLogin).toHaveBeenCalled()
    expect(container.childElementCount).toBeTruthy()
  })
})
