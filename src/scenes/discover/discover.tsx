import { getCategories, getCategoryPlaylists } from 'api/data/browse'
import { Carousel } from 'components/carousel/carousel'
import { IconButton } from 'components/ui'
import { PlayerContext } from 'contexts/player'
import { FC, useContext, useEffect, useState } from 'react'
import { BeatLoader } from 'react-spinners'
import { strings } from 'strings'
import styled from 'styled-components'
import { PagedDataList, Playlist } from 'types/media'

const Wrapper = styled.div``

export const Discover: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [categoryPlaylists, setCategoryPlaylists] = useState<Playlist[]>([])
  const playerContext = useContext(PlayerContext)

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const categories = await getCategories()
      const requests: Array<Promise<PagedDataList<Playlist>>> = []
      categories.entities.forEach((category) => {
        requests.push(getCategoryPlaylists(category.id))
      })
      const responses = await Promise.all(requests)
      const populated = responses.filter((response) => response.total > 0)
      const playlists = populated.map((response) => response.entities[0])
      setCategoryPlaylists(playlists)
      setIsLoading(false)
    }
    fetch()
  }, [])

  const carouselCards = categoryPlaylists.map(
    ({ id, name, images, description }) => ({
      title: name,
      subtitle: description,
      image: images ? images[0] : '',
      cta: (
        <IconButton
          title={strings.scenes.discover.listenTo}
          icon="fa-play"
          onClickCallback={() => playerContext.playPlaylist(id)}
        />
      ),
    }),
  )

  return isLoading ? (
    <BeatLoader />
  ) : (
    <Wrapper id="mainScreenWrapper">
      <Carousel cards={carouselCards} />
    </Wrapper>
  )
}
