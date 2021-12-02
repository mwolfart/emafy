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
}

const Wrapper = styled.div`
  ${({ theme = mainStyles }: StyledProps) => `
    display: flex;
    flex-direction: column;
    background-color: ${theme.palette.colorBackgroundSidebar};
    height: 100%;
    width: ${theme.sidebarWidth};
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
  },
  {
    title: strings.components.sidebar.albums,
    path: '/saved-albums/',
    icon: 'fa-compact-disc',
  },
  {
    title: strings.components.sidebar.artists,
    path: '/saved-artists/',
    icon: 'fa-guitar',
  },
  {
    title: strings.components.sidebar.playlists,
    path: '/saved-playlists/',
    icon: 'fa-list',
  },
  {
    title: strings.components.sidebar.genres,
    path: '/genres/',
    icon: 'fa-th',
  },
]

const miscButtons: ButtonProps[] = [
  {
    title: strings.components.sidebar.discover,
    path: '/discover/',
    icon: 'fa-search',
  },
  {
    title: strings.components.sidebar.settings,
    path: '/settings/',
    icon: 'fa-cog',
  },
]

export const Sidebar: VFC = () => {
  const buttonGenerationFn = ({
    title,
    path,
    icon,
  }: ButtonProps): JSX.Element => (
    <SidebarButton title={title} path={path} icon={icon} key={path} />
  )
  return (
    <Wrapper>
      {mediaButtons.map(buttonGenerationFn)}
      <SidebarPause />
      {miscButtons.map(buttonGenerationFn)}
    </Wrapper>
  )
}
