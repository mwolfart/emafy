/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FC } from 'react'
import { NextURL } from 'types/global'
import { MediaPage } from 'scenes/mediaPage/mediaPage'
import { searchTerm } from 'api/data/browse'
import { strings } from 'strings'
import { PagedDataList, Media } from 'types/media'
import { useParams } from 'react-router'

type RouteParams = {
  term: string
}

interface Props {
  type: 'track' | 'album' | 'artist' | 'playlist'
}

export const MediaSearchPage: FC<Props> = ({ type }) => {
  const { term } = useParams<RouteParams>()
  if (!term) {
    return <></>
  }

  const fetch = async (next?: NextURL): Promise<PagedDataList<Media>> => {
    const { tracks, albums, artists, playlists } = await searchTerm(
      term,
      type,
      next,
    )
    switch (type) {
      default:
      case 'track':
        return tracks!
      case 'album':
        return albums!
      case 'artist':
        return artists!
      case 'playlist':
        return playlists!
    }
  }

  let title, subtext
  switch (type) {
    case 'track':
      title = strings.headings.tracksFound
      subtext = strings.ui.xTracks
      break
    case 'album':
      title = strings.headings.albumsFound
      subtext = strings.ui.xAlbums
      break
    case 'artist':
      title = strings.headings.artistsFound
      subtext = strings.ui.xArtists
      break
    case 'playlist':
      title = strings.headings.playlistsFound
      subtext = strings.ui.xPlaylists
      break
  }

  return <MediaPage fetchFn={fetch} title={title} subtext={subtext} />
}
