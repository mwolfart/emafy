import { VFC } from 'react'
import { getOwnFollowedUsers } from 'api/data'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
import { SavedMedia } from 'components/media/ui/savedMedia'
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
    <SavedMedia
      {...savedMediaProps}
      mediaTitle={mediaTitle}
      mediaCountLabel={mediaCountLabel}
    />
  )
}
