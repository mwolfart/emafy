import { defaultTheme } from 'theme'
import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { PlayerVolumeControl } from './playerVolumeControl'

describe('Volume Control', () => {
  it('renders component and sets volume correctly', () => {
    const setVolume = jest.fn()
    render(
      <ThemeProvider theme={defaultTheme}>
        <PlayerVolumeControl setVolume={setVolume} currentVolume={0.5} />
      </ThemeProvider>,
    )

    const sliderElement = screen.getByRole('slider', { hidden: true })
    expect(sliderElement).toBeInTheDocument()
    fireEvent.change(sliderElement, { target: { value: 40 } })
    expect(setVolume).toHaveBeenCalledWith(0.4)
  })
})
