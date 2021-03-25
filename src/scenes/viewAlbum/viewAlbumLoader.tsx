import { getAlbum } from 'api/data'
import { useEffect, useState, VFC } from 'react'
import { RouteComponentProps } from 'react-router'
import { Album } from 'types/media'
import { ViewAlbum } from './viewAlbum'
import { GlobalProps as StyledProps } from 'types/global'
import { strings } from 'strings'

type MatchParams = {
  id: string
}

type Props = {} & RouteComponentProps<MatchParams> & StyledProps

export const ViewAlbumLoader: VFC<Props> = ({ match }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [album, setAlbum] = useState<Album | undefined>()

  useEffect(() => {
    getAlbum(match.params.id)
      .then(({ entities: loadedAlbum }) => {
        setAlbum(loadedAlbum)
      })
      .catch(() => {
        alert(strings.scenes.albums.errorLoadingAlbum)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [match])

  return isLoading ? (
    <>Loading...</>
  ) : album ? (
    <ViewAlbum albumInfo={album} />
  ) : (
    <>Failed</>
  )
}
