import { getArtistAlbums } from 'api/data/artists'
import { BeatLoader } from 'components/loader'
import { ArtistBanner } from 'components/media/artist/banner/banner'
import { MediaMenu } from 'components/media/menu/menu'
import { Tab, TabGroup } from 'components/tab/tabGroup'
import { useGetArtistDetails } from 'hooks/useGetArtistDetails'
import { useGetMediaList } from 'hooks/useGetMediaList'
import { useCallback, FC } from 'react'
import { useParams } from 'react-router'
import { strings } from 'strings'
import styled from 'styled-components'
import { NextURL } from 'types/global'

type RouteProps = { id: string }

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
`

export const ViewArtist: FC = () => {
  const params = useParams<RouteProps>()
  const id = params.id || ''
  const { isLoading, artistInfo, setArtistInfo } = useGetArtistDetails(id)
  const { topTracks } = artistInfo
  const topTracksCount = topTracks.length

  const getArtistAlbumsCallback = useCallback(
    (next?: NextURL) => getArtistAlbums(id, next),
    [params.id],
  )
  const artistAlbumsQuery = useGetMediaList(getArtistAlbumsCallback)
  const { totalCount: totalAlbums } = artistAlbumsQuery
  const bannerSubtitle = `${totalAlbums} ${strings.scenes.artistDetail.albums}`

  return isLoading || !artistInfo ? (
    <BeatLoader />
  ) : (
    <Wrapper id="mainScreenWrapper">
      <ArtistBanner
        artistInfo={artistInfo}
        subtitle={bannerSubtitle}
        setArtistInfo={setArtistInfo}
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
