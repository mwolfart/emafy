import {
  getArtist,
  getArtistAlbums,
  getArtistRelatedArtists,
  getArtistTopTracks,
} from 'api/data'
import { cancellableRequest } from 'api/utils'
import { BeatLoader } from 'components/loader'
import { Banner } from 'components/media/artist/banner/banner'
import { useEffect, useState, VFC } from 'react'
import { RouteComponentProps } from 'react-router'
import { strings } from 'strings'
import styled from 'styled-components'
import { SimpleArtist } from 'types/media'

interface MatchParams {
  id: string
}

type Props = RouteComponentProps<MatchParams>

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const ViewArtist: VFC<Props> = ({ match }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [artistInfo, setArtistInfo] = useState<SimpleArtist | undefined>()
  const [bannerSubtitle, setBannerSubtitle] = useState<string>('')
  const [relatedArtists, setRelatedArtists] = useState<SimpleArtist[]>([])

  useEffect(() => {
    return cancellableRequest(
      () =>
        Promise.all([
          getArtist(match.params.id),
          getArtistAlbums(match.params.id),
          getArtistTopTracks(match.params.id),
          getArtistRelatedArtists(match.params.id),
        ]),
      ([
        { entities: artistInfo },
        { entities: albumList, total: totalAlbums },
        { entities: topTracksList },
        { entities: relatedArtists },
      ]) => {
        setArtistInfo(artistInfo)
        setBannerSubtitle(
          `${totalAlbums} ${strings.scenes.artistDetail.albums}`,
        )
        setRelatedArtists(relatedArtists)
        setIsLoading(false)
      },
      () => {},
      () => {
        setIsLoading(false)
      },
    )
  }, [match.params.id])

  return isLoading || !artistInfo ? (
    <BeatLoader />
  ) : (
    <Wrapper>
      <Banner
        mediaInfo={artistInfo}
        subtitle={bannerSubtitle}
        relatedArtists={relatedArtists}
      />
    </Wrapper>
  )
}
