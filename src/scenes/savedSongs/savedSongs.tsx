import { VFC } from 'react'
import { getOwnSavedSongs } from 'api/data'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
import { Page as MediaPage } from 'components/media/menu/page/page'
import { Song } from 'types/media'
import { strings } from 'strings'
import { BeatLoader } from 'components/loader'
import { Headline } from 'components/ui'
import styled from 'styled-components'

const Wrapper = styled.div`
  ${({ theme }) => `
    padding: 0 ${theme.divSpacingBig};
  `}
`

export const SavedSongs: VFC = () => {
  const savedMediaProps = useGetSavedMedia<Song>(getOwnSavedSongs)
  const { totalCount, isLoading } = savedMediaProps

  const mediaTitle = strings.scenes.songs.mySavedSongs
  const mediaCountLabel =
    totalCount === 1
      ? strings.scenes.songs.subtextSong
      : strings.scenes.songs.subtextSongs
  const mediaSubtitle = `${totalCount} ${mediaCountLabel}`

  return isLoading ? (
    <BeatLoader />
  ) : (
    <Wrapper>
      <Headline title={mediaTitle} subtitle={mediaSubtitle} />
      <MediaPage {...savedMediaProps} />
    </Wrapper>
  )
}
