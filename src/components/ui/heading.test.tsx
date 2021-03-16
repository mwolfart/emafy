import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import faker from 'faker'

import { SubtitleBig, SubtitleNormal, TitleBig, TitleNormal } from './index'
import React from 'react'

describe('Heading', () => {
  it('renders all Headings correctly', () => {
    const texts = Array.from({ length: 4 }, () => faker.random.words())
    render(
      <ThemeProvider theme={mainStyles}>
        <TitleBig>{texts[0]}</TitleBig>
        <SubtitleBig>{texts[1]}</SubtitleBig>
        <TitleNormal>{texts[2]}</TitleNormal>
        <SubtitleNormal>{texts[3]}</SubtitleNormal>
      </ThemeProvider>,
    )
    texts.forEach((text: string) => {
      const element = screen.getByRole('heading', { name: text })
      expect(element).toBeInTheDocument()
    })
  })
})
