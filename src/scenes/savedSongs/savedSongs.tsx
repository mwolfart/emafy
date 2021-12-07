import { VFC } from 'react'
import { getOwnSavedSongs } from 'api/data'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
import { SavedMedia } from 'components/media/ui/savedMedia'
import { Song } from 'types/media'
import { strings } from 'strings'

export const SavedSongs: VFC = () => {
  const savedMediaProps = useGetSavedMedia<Song>(getOwnSavedSongs)
  const { totalCount } = savedMediaProps

  const mediaTitle = strings.scenes.songs.mySavedSongs
  const mediaCountLabel =
    totalCount === 1
      ? strings.scenes.songs.subtextSong
      : strings.scenes.songs.subtextSongs

  return (
    <SavedMedia
      {...savedMediaProps}
      mediaTitle={mediaTitle}
      mediaCountLabel={mediaCountLabel}
    />
  )
}
