import { getArtistAlbums, NextURL } from 'api/data'
import { BeatLoader } from 'components/loader'
import { ArtistBanner } from 'components/media/artist/banner/banner'
import { MediaMenu } from 'components/media/menu/menu'
import { Tab } from 'components/tab/tab'
import { TabGroup } from 'components/tab/tabGroup'
import { useGetArtistDetails } from 'hooks/useGetArtistDetails'
import { useGetMediaList } from 'hooks/useGetMediaList'
import { useCallback, VFC } from 'react'
import { RouteComponentProps } from 'react-router'
import { strings } from 'strings'
import styled from 'styled-components'

interface MatchParams {
  id: string
}

type Props = RouteComponentProps<MatchParams>

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
`

export const ViewArtist: VFC<Props> = ({ match }) => {
  const { isLoading, artistInfo } = useGetArtistDetails(match.params.id)
  const { topTracks, relatedArtists } = artistInfo
  const topTracksCount = topTracks.length

  const getArtistAlbumsCallback = useCallback(
    (next?: NextURL) => getArtistAlbums(match.params.id, next),
    [match.params.id],
  )
  const artistAlbumsQuery = useGetMediaList(getArtistAlbumsCallback)
  const { totalCount: totalAlbums } = artistAlbumsQuery
  const bannerSubtitle = `${totalAlbums} ${strings.scenes.artistDetail.albums}`

  return isLoading || !artistInfo ? (
    <BeatLoader />
  ) : (
    <Wrapper id="mainScreenWrapper">
      <ArtistBanner
        mediaInfo={artistInfo}
        subtitle={bannerSubtitle}
        relatedArtists={relatedArtists}
      />
      <TabGroup>
        <Tab title="Albums" id="albums">
          <MediaMenu {...artistAlbumsQuery} />
        </Tab>
        <Tab title="Top Songs" id="top-songs">
          <MediaMenu
            mediaList={topTracks}
            totalCount={topTracksCount}
            nextURL={null}
          />
        </Tab>
      </TabGroup>
    </Wrapper>
  )
}
