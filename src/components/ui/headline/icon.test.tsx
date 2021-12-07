import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import faker from 'faker'

import { IconHeadline } from './icon'

describe('IconHeadline', () => {
  it('renders IconHeadline correctly', () => {
    const title = faker.random.words()
    const subtitle = faker.random.words()
    render(
      <ThemeProvider theme={mainStyles}>
        <IconHeadline icon="fa-times" title={title} subtitle={subtitle} />
      </ThemeProvider>,
    )
    const elementTitle = screen.getByText(title)
    const elementSubtitle = screen.getByText(subtitle)
    expect(elementTitle).toBeInTheDocument()
    expect(elementSubtitle).toBeInTheDocument()
  })
})
