import { VFC } from 'react'
import { getOwnPlaylists } from 'api/data'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
import { Page as MediaPage } from 'components/media/menu/page/page'
import { Playlist } from 'types/media'
import { strings } from 'strings'
import { BeatLoader } from 'components/loader'
import { Headline } from 'components/ui'
import styled from 'styled-components'

const Wrapper = styled.div`
  ${({ theme }) => `
    padding: 0 ${theme.divSpacingBig};
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
    <Wrapper>
      <Headline title={mediaTitle} subtitle={mediaSubtitle} />
      <MediaPage {...savedMediaProps} />
    </Wrapper>
  )
}
