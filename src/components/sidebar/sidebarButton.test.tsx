import { fireEvent, render, screen } from '@testing-library/react'
import faker from 'faker'
import { SidebarButton } from './sidebarButton'
import { createMemoryHistory } from 'history'

describe('Sidebar button', () => {
  it('renders component correctly', () => {
    const title = faker.random.word()
    const path = faker.random.arrayElements(3).join('/')
    const icon = faker.random.word()

    render(<SidebarButton title={title} path={path} icon={icon} />)
    const titleElement = screen.getByText(title)
    expect(titleElement).toBeInTheDocument()
  })

  it('sends user to correct path', () => {
    const title = faker.random.word()
    const path = faker.random.arrayElements(3).join('/')
    const icon = faker.random.word()

    const history = createMemoryHistory()
    history.push = jest.fn()

    render(<SidebarButton title={title} path={path} icon={icon} />)
    fireEvent.click(screen.getByText(title))
    expect(history.push).toHaveBeenCalledWith(path)
  })
})
