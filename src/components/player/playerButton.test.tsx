import { fireEvent, render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { PlayerButton } from './playerButton'

describe('Player Button', () => {
  it('renders component correctly', () => {
    const buttonClick = jest.fn()
    const buttonLabel = faker.random.word()
    render(
      <ThemeProvider theme={defaultTheme}>
        <PlayerButton
          iconClass="fa-play"
          onClick={buttonClick}
          isLarge={true}
          ariaLabel={buttonLabel}
        />
      </ThemeProvider>,
    )
    const buttonElement = screen.getByRole('button', { name: buttonLabel })
    expect(buttonElement).toBeInTheDocument()
    fireEvent.click(buttonElement)
    expect(buttonClick).toHaveBeenCalled()
  })
})
