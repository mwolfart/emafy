import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import faker from 'faker'
import { SnippetContainer } from './snippetContainer'

describe('Snippet Container', () => {
  it('renders component and props correctly', () => {
    const text = faker.random.words()
    render(
      <ThemeProvider theme={defaultTheme}>
        <SnippetContainer>{text}</SnippetContainer>
      </ThemeProvider>,
    )
    const element = screen.getByText(text)
    expect(element).toBeInTheDocument()
  })
})
