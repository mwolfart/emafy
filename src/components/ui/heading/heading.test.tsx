import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import faker from 'faker'
import {
  SubtitleLarge,
  SubtitleNormal,
  TitleLarge,
  TitleNormal,
} from '../index'

describe('Heading', () => {
  it('renders components and props correctly', () => {
    const texts = Array.from({ length: 4 }, () => faker.random.words())
    render(
      <ThemeProvider theme={defaultTheme}>
        <TitleLarge>{texts[0]}</TitleLarge>
        <SubtitleLarge>{texts[1]}</SubtitleLarge>
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
