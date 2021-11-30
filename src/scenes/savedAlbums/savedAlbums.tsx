import { VFC } from 'react'
import { getSavedAlbums } from 'api/data'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
import { SavedMedia } from 'components/media/ui/savedMedia'
import { Album } from 'types/media'
import { strings } from 'strings'

export const SavedAlbums: VFC = () => {
  const savedMediaProps = useGetSavedMedia<Album>(getSavedAlbums)
  const { totalCount } = savedMediaProps

  const mediaTitle = strings.scenes.albums.mySavedAlbums
  const mediaCountLabel =
    totalCount === 1
      ? strings.scenes.albums.subtextAlbum
      : strings.scenes.albums.subtextAlbums

  return (
    <SavedMedia
      {...savedMediaProps}
      mediaTitle={mediaTitle}
      mediaCountLabel={mediaCountLabel}
    />
  )
}
