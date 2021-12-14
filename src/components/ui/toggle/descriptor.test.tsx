import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import faker from 'faker'
import { Descriptor } from '../toggle/descriptor'

describe('Descriptor', () => {
  it('renders Descriptor correctly', () => {
    const labelFalse = faker.random.word()
    const labelTrue = faker.random.word()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Descriptor
          toggleState={true}
          onChangeCallback={() => {}}
          labelFalse={labelFalse}
          labelTrue={labelTrue}
        />
      </ThemeProvider>,
    )
    const lblLeftElement = screen.getByText(labelFalse)
    const lblRightElement = screen.getByText(labelTrue)
    expect(lblLeftElement).toBeInTheDocument()
    expect(lblRightElement).toBeInTheDocument()
  })
})
