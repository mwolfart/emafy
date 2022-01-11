import { BeatLoader } from 'components/loader'
import { Banner } from 'components/media/artist/banner/banner'
import { Group as MediaGroup } from 'components/media/menu/group/group'
import { Tab } from 'components/tab/tab'
import { TabGroup } from 'components/tab/tabGroup'
import { useGetArtistDetails } from 'hooks/useGetArtistDetails'
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
  overflow: scroll;
`

export const ViewArtist: VFC<Props> = ({ match }) => {
  const {
    isLoading,
    artistInfo,
    relatedArtists,
    artistAlbums,
    artistTotalAlbums,
  } = useGetArtistDetails(match.params.id)
  const bannerSubtitle = `${artistTotalAlbums} ${strings.scenes.artistDetail.albums}`

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
        <Tab title="Albums">
          <MediaGroup mediaList={artistAlbums} />
        </Tab>
        <Tab title="Top Songs">
          <p>ASDSAD</p>
        </Tab>
      </TabGroup>
    </Wrapper>
  )
}
