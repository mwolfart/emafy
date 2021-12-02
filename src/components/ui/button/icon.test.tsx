import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { strings } from 'strings'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { IconButton } from './icon'

describe('IconButton', () => {
  it('renders IconButton correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <IconButton icon="fa-times" onClickCallback={() => {}} />
      </ThemeProvider>,
    )
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeInTheDocument()
  })

  it('calls onClickCallback on button click', () => {
    const onClick = jest.fn()
    render(
      <ThemeProvider theme={mainStyles}>
        <IconButton icon="fa-times" onClickCallback={onClick} />
      </ThemeProvider>,
    )
    const buttonElement = screen.getByRole('button')
    fireEvent.click(buttonElement)
    expect(onClick).toHaveBeenCalled()
  })
})
