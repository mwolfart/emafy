import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import faker from 'faker'

import { ToggleButton } from '../index'
import { strings } from 'strings'

describe('ToggleButton', () => {
  it('renders ToggleButton correctly', () => {
    const labelLeft = faker.random.word()
    const labelRight = faker.random.word()
    render(
      <ThemeProvider theme={mainStyles}>
        <ToggleButton
          toggleState={true}
          onChangeCallback={() => {}}
          labelLeft={labelLeft}
          labelRight={labelRight}
        />
      </ThemeProvider>,
    )
    const inputElement = screen.getByRole('checkbox', {
      name: strings.components.toggleButton,
    })
    const lblLeftElement = screen.getByText(labelLeft)
    const lblRightElement = screen.getByText(labelRight)
    expect(inputElement).toBeInTheDocument()
    expect(lblLeftElement).toBeInTheDocument()
    expect(lblRightElement).toBeInTheDocument()
  })

  it('calls ToggleButton change callback', () => {
    const onChangeCallback = jest.fn()
    render(
      <ThemeProvider theme={mainStyles}>
        <ToggleButton toggleState={true} onChangeCallback={onChangeCallback} />
      </ThemeProvider>,
    )
    const inputElement = screen.getByRole('checkbox', {
      name: strings.components.toggleButton,
    })
    fireEvent.click(inputElement)
    expect(onChangeCallback).toHaveBeenCalledWith(false)
  })
})
