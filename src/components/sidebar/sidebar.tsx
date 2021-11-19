import { VFC } from 'react'
import styled from 'styled-components'
import { SidebarButton } from './sidebarButton'
import { GlobalProps as StyledProps } from 'types/global'
import { mainStyles } from 'styles'
import { strings } from 'strings'

type ButtonProps = {
  title: string
  path: string
  icon: string
  key: number
}

const Wrapper = styled.div`
  ${({ theme = mainStyles }: StyledProps) => `
    display: flex;
    flex-direction: column;
    background-color: ${theme.palette.colorBackgroundSidebar};
    height: 100%;
    position: fixed;
 `}
`

const SidebarPause = styled.div`
  height: 10%;
`

const mediaButtons: ButtonProps[] = [
  {
    title: strings.components.sidebar.songs,
    path: '/saved-songs/',
    icon: 'fa-music',
    key: 0,
  },
  {
    title: strings.components.sidebar.albums,
    path: '/saved-albums/',
    icon: 'fa-compact-disc',
    key: 1,
  },
  {
    title: strings.components.sidebar.artists,
    path: '/saved-artists/',
    icon: 'fa-guitar',
    key: 2,
  },
  {
    title: strings.components.sidebar.playlists,
    path: '/saved-playlists/',
    icon: 'fa-list',
    key: 3,
  },
  {
    title: strings.components.sidebar.genres,
    path: '/',
    icon: 'fa-th',
    key: 4,
  },
]

const miscButtons: ButtonProps[] = [
  {
    title: strings.components.sidebar.discover,
    path: '/',
    icon: 'fa-search',
    key: 5,
  },
  {
    title: strings.components.sidebar.settings,
    path: '/',
    icon: 'fa-cog',
    key: 6,
  },
]

export const Sidebar: VFC = () => {
  const buttonGenerationFn = ({
    title,
    path,
    icon,
    key,
  }: ButtonProps): JSX.Element => (
    <SidebarButton title={title} path={path} icon={icon} key={key} />
  )
  return (
    <Wrapper>
      {mediaButtons.map(buttonGenerationFn)}
      <SidebarPause />
      {miscButtons.map(buttonGenerationFn)}
    </Wrapper>
  )
}
