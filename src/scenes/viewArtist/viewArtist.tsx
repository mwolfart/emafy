import { getArtistAlbums } from 'api/data'
import { BeatLoader } from 'components/loader'
import { Banner } from 'components/media/artist/banner/banner'
import { Page as MediaPage } from 'components/media/menu/page/page'
import { Tab } from 'components/tab/tab'
import { TabGroup } from 'components/tab/tabGroup'
import { useGetArtistDetails } from 'hooks/useGetArtistDetails'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
import { VFC } from 'react'
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
`

export const ViewArtist: VFC<Props> = ({ match }) => {
  const { isLoading, artistInfo, relatedArtists, artistTopTracks } =
    useGetArtistDetails(match.params.id)
  const topTracksCount = artistTopTracks.length
  const artistAlbumsProps = useGetSavedMedia(() =>
    getArtistAlbums(match.params.id),
  )
  const { totalCount: totalAlbums } = artistAlbumsProps
  const bannerSubtitle = `${totalAlbums} ${strings.scenes.artistDetail.albums}`

  return isLoading || !artistInfo ? (
    <BeatLoader />
  ) : (
    <Wrapper>
      <Banner
        mediaInfo={artistInfo}
        subtitle={bannerSubtitle}
        relatedArtists={relatedArtists}
      />
      <TabGroup>
        <Tab title="Albums" id="albums">
          <MediaPage {...artistAlbumsProps} />
        </Tab>
        <Tab title="Top Songs" id="top-songs">
          <MediaPage
            mediaList={artistTopTracks}
            totalCount={topTracksCount}
            nextURL={null}
          />
        </Tab>
      </TabGroup>
    </Wrapper>
  )
}
