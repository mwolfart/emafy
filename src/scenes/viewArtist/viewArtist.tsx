import { getArtist } from 'api/data'
import { cancellableRequest } from 'api/utils'
import { BeatLoader } from 'components/loader'
import { Banner } from 'components/media/artist/banner/banner'
import { useEffect, useState, VFC } from 'react'
import { RouteComponentProps } from 'react-router'
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

  useEffect(() => {
    return cancellableRequest(
      () => getArtist(match.params.id),
      ({ entities: artistInfo }) => {
        setArtistInfo(artistInfo)
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
      <Banner mediaInfo={artistInfo} />
    </Wrapper>
  )
}
