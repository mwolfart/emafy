import { VFC } from 'react'
import { getOwnPlaylists } from 'api/data'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
import { Playlist } from 'types/media'
import { strings } from 'strings'
import { BeatLoader } from 'components/loader'
import { Headline } from 'components/ui'
import styled from 'styled-components'
import { MediaMenu } from 'components/media/menu/menu'

const Wrapper = styled.div`
  ${({ theme }) => `
    padding: 0 ${theme.divSpacingBig};
    overflow: auto;
    height: 100%;
  `}
`

export const MyPlaylists: VFC = () => {
  const savedMediaProps = useGetSavedMedia<Playlist>(getOwnPlaylists)
  const { totalCount, isLoading } = savedMediaProps

  const mediaTitle = strings.scenes.playlists.myPlaylists
  const mediaCountLabel =
    totalCount === 1
      ? strings.scenes.playlists.subtextPlaylist
      : strings.scenes.playlists.subtextPlaylists
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
