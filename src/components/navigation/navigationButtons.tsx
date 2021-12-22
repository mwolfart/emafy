import { strings } from 'strings'

export type ButtonProps = {
  title: string
  path: string
  icon: string
}

export const mediaButtons: ButtonProps[] = [
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

export const miscButtons: ButtonProps[] = [
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
