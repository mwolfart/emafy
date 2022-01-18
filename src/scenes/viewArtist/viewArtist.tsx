import { getArtistAlbums, NextURL } from 'api/data'
import { BeatLoader } from 'components/loader'
import { Banner } from 'components/media/artist/banner/banner'
import { MediaMenu } from 'components/media/menu/menu'
import { Tab } from 'components/tab/tab'
import { TabGroup } from 'components/tab/tabGroup'
import { useGetArtistDetails } from 'hooks/useGetArtistDetails'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
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
  const { isLoading, artistInfo, relatedArtists, artistTopTracks } =
    useGetArtistDetails(match.params.id)
  const topTracksCount = artistTopTracks.length
  const getArtistAlbumsCallback = useCallback(
    (next?: NextURL) => getArtistAlbums(match.params.id, next),
    [match.params.id],
  )
  const artistAlbumsProps = useGetSavedMedia(getArtistAlbumsCallback)
  const { totalCount: totalAlbums } = artistAlbumsProps
  const bannerSubtitle = `${totalAlbums} ${strings.scenes.artistDetail.albums}`

  return isLoading || !artistInfo ? (
    <BeatLoader />
  ) : (
    <Wrapper id="mainScreenWrapper">
      <Banner
        mediaInfo={artistInfo}
        subtitle={bannerSubtitle}
        relatedArtists={relatedArtists}
      />
      <TabGroup>
        <Tab title="Albums" id="albums">
          <MediaMenu {...artistAlbumsProps} />
        </Tab>
        <Tab title="Top Songs" id="top-songs">
          <MediaMenu
            mediaList={artistTopTracks}
            totalCount={topTracksCount}
            nextURL={null}
          />
        </Tab>
      </TabGroup>
    </Wrapper>
  )
}
