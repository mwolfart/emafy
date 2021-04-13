import { VFC } from 'react'
import styled from 'styled-components'
import { SidebarButton } from './sidebarButton'
import { GlobalProps as StyledProps } from 'types/global'
import { mainStyles } from 'styles'

const Wrapper = styled.div`
  ${({ theme = mainStyles }: StyledProps) => `
    display: flex;
    flex-direction: column;
    background-color: ${theme.palette.colorBackgroundSidebar};
    height: 100%;
 `}
`

const SidebarPause = styled.div`
  height: 10%;
`

export const Sidebar: VFC = () => {
  return (
    <Wrapper>
      <SidebarButton title="Songs" path="/saved-songs/" icon="fa-music" />
      <SidebarButton title="Albums" path="/saved-albums/" icon="fa-guitar" />
      <SidebarButton
        title="Artists"
        path="/saved-artists/"
        icon="fa-compact-disc"
      />
      <SidebarButton
        title="Playlists"
        path="/saved-playlists/"
        icon="fa-list"
      />
      <SidebarButton title="Genres" path="" icon="fa-th" />
      <SidebarPause />
      <SidebarButton title="Discover" path="" icon="fa-search" />
      <SidebarButton title="Settings" path="" icon="fa-cog" />
    </Wrapper>
  )
}
