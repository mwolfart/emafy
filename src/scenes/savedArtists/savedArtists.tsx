import { VFC } from 'react'
import { getOwnFollowedUsers } from 'api/data'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
import { Page as MediaPage } from 'components/media/menu/page/page'
import { SimpleArtist } from 'types/media'
import { strings } from 'strings'
import { BeatLoader } from 'components/loader'

export const SavedArtists: VFC = () => {
  const savedMediaProps = useGetSavedMedia<SimpleArtist>(getOwnFollowedUsers)
  const { totalCount, isLoading } = savedMediaProps

  const mediaTitle = strings.scenes.artists.mySavedArtists
  const mediaCountLabel =
    totalCount === 1
      ? strings.scenes.artists.subtextArtist
      : strings.scenes.artists.subtextArtists

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
