import { VFC } from 'react'
import { getOwnSavedSongs } from 'api/data'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
import { Page as MediaPage } from 'components/media/page/page'
import { Song } from 'types/media'
import { strings } from 'strings'
import { BeatLoader } from 'components/loader'

export const SavedSongs: VFC = () => {
  const savedMediaProps = useGetSavedMedia<Song>(getOwnSavedSongs)
  const { totalCount, isLoading } = savedMediaProps

  const mediaTitle = strings.scenes.songs.mySavedSongs
  const mediaCountLabel =
    totalCount === 1
      ? strings.scenes.songs.subtextSong
      : strings.scenes.songs.subtextSongs

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
