import { fireEvent, render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { SidebarButton } from './sidebarButton'
import { createMemoryHistory } from 'history'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { BrowserRouter, Router } from 'react-router-dom'

describe('Sidebar Button', () => {
  it('renders component and props correctly', () => {
    const title = faker.random.word()
    const path = faker.random.words(3).split(' ').join('/')
    const icon = faker.random.word()

    render(
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <SidebarButton title={title} path={path} icon={icon} />
        </BrowserRouter>
      </ThemeProvider>,
    )
    const titleElement = screen.getByText(title)
    expect(titleElement).toBeInTheDocument()
  })

  it('sends user to correct path', () => {
    const title = faker.random.word()
    const path = `/${faker.random.words(3).split(' ').join('/')}`
    const pushParams = { hash: '', pathname: path, search: '' }
    const icon = faker.random.word()

    const history = createMemoryHistory()
    history.push = jest.fn()

    render(
      <ThemeProvider theme={defaultTheme}>
        <Router location={history.location} navigator={history}>
          <SidebarButton title={title} path={path} icon={icon} />
        </Router>
      </ThemeProvider>,
    )
    fireEvent.click(screen.getByText(title))
    expect(history.push).toHaveBeenCalledWith(pushParams, undefined)
  })
})
