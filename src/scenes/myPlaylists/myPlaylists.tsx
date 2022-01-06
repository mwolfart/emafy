import { VFC } from 'react'
import { getOwnPlaylists } from 'api/data'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
import { Page as MediaPage } from 'components/media/menu/page/page'
import { Playlist } from 'types/media'
import { strings } from 'strings'
import { BeatLoader } from 'components/loader'

export const MyPlaylists: VFC = () => {
  const savedMediaProps = useGetSavedMedia<Playlist>(getOwnPlaylists)
  const { totalCount, isLoading } = savedMediaProps

  const mediaTitle = strings.scenes.playlists.myPlaylists
  const mediaCountLabel =
    totalCount === 1
      ? strings.scenes.playlists.subtextPlaylist
      : strings.scenes.playlists.subtextPlaylists

  return isLoading ? (
    <BeatLoader />
  ) : (
    <MediaPage
      {...savedMediaProps}
      pageTitle={mediaTitle}
      mediaCountLabel={mediaCountLabel}
    />
  )
}
