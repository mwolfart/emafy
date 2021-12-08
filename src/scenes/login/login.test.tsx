import { render } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { LoginScene } from './login'

describe('Login', () => {
  it('renders Login scene correctly', () => {
    const onLogin = jest.fn()
    const { container } = render(
      <ThemeProvider theme={defaultTheme}>
        <LoginScene onLogin={onLogin} />
      </ThemeProvider>,
    )
    expect(onLogin).toHaveBeenCalled()
    expect(container.childElementCount).toBeTruthy()
  })
})
