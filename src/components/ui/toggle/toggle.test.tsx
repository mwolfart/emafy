import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { strings } from 'strings'
import { Toggle } from './toggle'

describe('Toggle', () => {
  it('renders Toggle correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Toggle toggleState={true} onChangeCallback={() => {}} />
      </ThemeProvider>,
    )
    const inputElement = screen.getByRole('checkbox', {
      name: strings.components.media.toggleView,
    })
    expect(inputElement).toBeInTheDocument()
  })

  it('calls Toggle change callback', () => {
    const onChangeCallback = jest.fn()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Toggle toggleState={true} onChangeCallback={onChangeCallback} />
      </ThemeProvider>,
    )
    const inputElement = screen.getByRole('checkbox', {
      name: strings.components.media.toggleView,
    })
    fireEvent.click(inputElement)
    expect(onChangeCallback).toHaveBeenCalledWith(false)
  })
})
