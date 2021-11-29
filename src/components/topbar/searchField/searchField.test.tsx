import { render, screen } from '@testing-library/react'
import { strings } from 'strings'
import { SearchField } from './searchField'

describe('Search Field', () => {
  it('renders component correctly', () => {
    render(<SearchField />)
    const element = screen.getByLabelText(strings.components.topbar.searchSong)
    expect(element).toBeInTheDocument()
  })
})
