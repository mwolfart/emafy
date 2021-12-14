import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import faker from 'faker'

import { Headline } from './default'

describe('Headline', () => {
  it('renders Headline correctly', () => {
    const title = faker.random.words()
    const subtitle = faker.random.words()
    render(
      <ThemeProvider theme={mainStyles}>
        <Headline title={title} subtitle={subtitle} />
      </ThemeProvider>,
    )
    const elementTitle = screen.getByText(title)
    const elementSubtitle = screen.getByText(subtitle)
    expect(elementTitle).toBeInTheDocument()
    expect(elementSubtitle).toBeInTheDocument()
  })
})