import { VFC } from 'react'
import { getOwnFollowedUsers } from 'api/data'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
import { Page as MediaPage } from 'components/media/menu/page/page'
import { SimpleArtist } from 'types/media'
import { strings } from 'strings'
import { BeatLoader } from 'components/loader'
import { Headline } from 'components/ui'
import styled from 'styled-components'

const Wrapper = styled.div`
  ${({ theme }) => `
    padding: 0 ${theme.divSpacingBig};
  `}
`

export const SavedArtists: VFC = () => {
  const savedMediaProps = useGetSavedMedia<SimpleArtist>(getOwnFollowedUsers)
  const { totalCount, isLoading } = savedMediaProps

  const mediaTitle = strings.scenes.artists.mySavedArtists
  const mediaCountLabel =
    totalCount === 1
      ? strings.scenes.artists.subtextArtist
      : strings.scenes.artists.subtextArtists
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
