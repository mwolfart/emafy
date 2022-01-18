import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import faker from 'faker'

import { IconHeadline } from './icon'

describe('IconHeadline', () => {
  it('renders component and props correctly', () => {
    const title = faker.random.words()
    const subtitle = faker.random.words()
    render(
      <ThemeProvider theme={defaultTheme}>
        <IconHeadline icon="fa-times" title={title} subtitle={subtitle} />
      </ThemeProvider>,
    )
    const elementTitle = screen.getByText(title)
    const elementSubtitle = screen.getByText(subtitle)
    expect(elementTitle).toBeInTheDocument()
    expect(elementSubtitle).toBeInTheDocument()
  })
})
