import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { strings } from 'strings'
import { Toggle } from './toggle'

describe('Toggle', () => {
  it('renders component and props correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Toggle toggleState={true} onChangeCallback={() => {}} />
      </ThemeProvider>,
    )
    const inputElement = screen.getByRole('checkbox', {
      name: strings.ui.toggleView,
    })
    expect(inputElement).toBeInTheDocument()
  })

  it('calls change callback on toggle', () => {
    const onChangeCallback = jest.fn()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Toggle toggleState={true} onChangeCallback={onChangeCallback} />
      </ThemeProvider>,
    )
    const inputElement = screen.getByRole('checkbox', {
      name: strings.ui.toggleView,
    })
    fireEvent.click(inputElement)
    expect(onChangeCallback).toHaveBeenCalledWith(false)
  })
})
