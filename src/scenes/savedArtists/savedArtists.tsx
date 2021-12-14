import { VFC } from 'react'
import { getOwnFollowedUsers } from 'api/data'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
import { Page as MediaPage } from 'components/media/page/page'
import { SimpleArtist } from 'types/media'
import { strings } from 'strings'

export const SavedArtists: VFC = () => {
  const savedMediaProps = useGetSavedMedia<SimpleArtist>(getOwnFollowedUsers)
  const { totalCount } = savedMediaProps

  const mediaTitle = strings.scenes.artists.mySavedArtists
  const mediaCountLabel =
    totalCount === 1
      ? strings.scenes.artists.subtextArtist
      : strings.scenes.artists.subtextArtists

  return (
    <MediaPage
      {...savedMediaProps}
      pageTitle={mediaTitle}
      mediaCountLabel={mediaCountLabel}
    />
  )
}
