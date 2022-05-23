import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { faker } from '@faker-js/faker'
import { ContainerFlexCol, ContainerFlexRow } from './container'

describe('Flex Container', () => {
  it('renders component and props correctly', () => {
    const text = faker.random.words()
    render(
      <ThemeProvider theme={defaultTheme}>
        <ContainerFlexCol>{text}</ContainerFlexCol>
      </ThemeProvider>,
    )
    const canvasElement = screen.getByText(text)
    expect(canvasElement).toBeInTheDocument()
  })

  it('renders component and props correctly', () => {
    const text = faker.random.words()
    render(
      <ThemeProvider theme={defaultTheme}>
        <ContainerFlexRow>{text}</ContainerFlexRow>
      </ThemeProvider>,
    )
    const canvasElement = screen.getByText(text)
    expect(canvasElement).toBeInTheDocument()
  })
})
