import { VFC } from 'react'
import { getOwnFollowedUsers } from 'api/data'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
import { SimpleArtist } from 'types/media'
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
    <Wrapper id="mainScreenWrapper">
      <Headline title={mediaTitle} subtitle={mediaSubtitle} />
      <MediaMenu {...savedMediaProps} />
    </Wrapper>
  )
}
