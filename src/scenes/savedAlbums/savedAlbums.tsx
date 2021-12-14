import { VFC } from 'react'
import { getOwnSavedAlbums } from 'api/data'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
import { Page as MediaPage } from 'components/media/page/page'
import { Album } from 'types/media'
import { strings } from 'strings'

export const SavedAlbums: VFC = () => {
  const savedMediaProps = useGetSavedMedia<Album>(getOwnSavedAlbums)
  const { totalCount } = savedMediaProps

  const mediaTitle = strings.scenes.albums.mySavedAlbums
  const mediaCountLabel =
    totalCount === 1
      ? strings.scenes.albums.subtextAlbum
      : strings.scenes.albums.subtextAlbums

  return (
    <MediaPage
      {...savedMediaProps}
      pageTitle={mediaTitle}
      mediaCountLabel={mediaCountLabel}
    />
  )
}
