import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { faker } from '@faker-js/faker'

import { Headline } from './default'

describe('Headline', () => {
  it('renders component and props correctly', () => {
    const title = faker.random.words()
    const subtitle = faker.random.words()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Headline title={title} subtitle={subtitle} />
      </ThemeProvider>,
    )
    const elementTitle = screen.getByText(title)
    const elementSubtitle = screen.getByText(subtitle)
    expect(elementTitle).toBeInTheDocument()
    expect(elementSubtitle).toBeInTheDocument()
  })
})
