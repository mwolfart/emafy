import { defaultTheme } from 'theme'
import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { PlayerVolumeControl } from './playerVolumeControl'

describe('Volume Control', () => {
  it('renders component and sets volume correctly', () => {
    const setVolume = jest.fn()
    const getVolume = jest.fn(() => new Promise<number>(() => 0.5))
    render(
      <ThemeProvider theme={defaultTheme}>
        <PlayerVolumeControl setVolume={setVolume} getVolume={getVolume} />
      </ThemeProvider>,
    )

    const sliderElement = screen.getByRole('slider')
    expect(sliderElement).toBeInTheDocument()
    fireEvent.change(sliderElement, { target: { value: 40 } })
    expect(setVolume).toHaveBeenCalledWith(0.4)
  })
})
