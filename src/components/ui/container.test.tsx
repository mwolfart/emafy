import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import faker from 'faker'
import { ContainerFlexCol, ContainerFlexRow } from './container'

describe('Container', () => {
  it('renders ContainerFlexCol correctly', () => {
    const text = faker.random.words()
    render(
      <ThemeProvider theme={mainStyles}>
        <ContainerFlexCol>{text}</ContainerFlexCol>
      </ThemeProvider>,
    )
    const canvasElement = screen.getByText(text)
    expect(canvasElement).toBeInTheDocument()
  })

  it('renders ContainerFlexRow correctly', () => {
    const text = faker.random.words()
    render(
      <ThemeProvider theme={mainStyles}>
        <ContainerFlexRow>{text}</ContainerFlexRow>
      </ThemeProvider>,
    )
    const canvasElement = screen.getByText(text)
    expect(canvasElement).toBeInTheDocument()
  })
})
