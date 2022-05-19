import { FC } from 'react'
import { useGetMediaList } from 'hooks/useGetMediaList'
import { Song } from 'types/media'
import { strings } from 'strings'
import { BeatLoader } from 'components/loader'
import { Headline } from 'components/ui'
import styled from 'styled-components'
import { MediaMenu } from 'components/media/menu/menu'
import { getOwnSavedSongs } from 'api/data/own'

const Wrapper = styled.div`
  ${({ theme }) => `
    padding: 0 ${theme.divSpacingBig};
    overflow: auto;
    height: 100%;
  `}
`

export const SavedSongs: FC = () => {
  const savedMediaProps = useGetMediaList<Song>(getOwnSavedSongs)
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
    <Wrapper id="mainScreenWrapper">
      <Headline title={mediaTitle} subtitle={mediaSubtitle} />
      <MediaMenu {...savedMediaProps} />
    </Wrapper>
  )
}
