import {
  getCategories,
  getCategoryPlaylists,
  getFeaturedPlaylists,
  getNewReleases,
  getTopArtists,
  getTopTracks,
} from 'api/data/browse'
import { Carousel } from 'components/carousel/carousel'
import { ContainerFlexRow, IconButton } from 'components/ui'
import { PlayerContext } from 'contexts/player'
import { FC, useContext, useEffect, useState } from 'react'
import { BeatLoader } from 'components/loader'
import { strings } from 'strings'
import styled from 'styled-components'
import { Album, PagedDataList, Playlist, SimpleArtist, Song } from 'types/media'
import { TopPicks } from 'components/browse/topPicks'
import { FeaturedPlaylists } from 'components/browse/featuredPlaylists'
import { MediaSummaryMenu } from 'components/media/summaryMenu/summaryMenu'
import { useNavigate } from 'react-router-dom'

const Wrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`

const MiddleContainer = styled(ContainerFlexRow)`
  ${({ theme }) => `
    margin: 0 ${theme.divSpacingExtraBig};
    padding-bottom: ${theme.divSpacingBig};
    border-bottom: 2px solid ${theme.palette.colorGray200};
    gap: ${theme.divSpacingExtraBig};
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0;
    }
  `}
`

export const Discover: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [categoryPlaylists, setCategoryPlaylists] = useState<Playlist[]>([])
  const [featuredPlaylists, setFeaturesPlaylists] = useState<Playlist[]>([])
  const [newAlbums, setNewAlbums] = useState<Album[]>([])
  const [topSongs, setTopSongs] = useState<Song[]>([])
  const [topArtists, setTopArtists] = useState<SimpleArtist[]>([])
  const playerContext = useContext(PlayerContext)

  useEffect(() => {
    const fetchCategoryPlaylists = async (): Promise<void> => {
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
    const fetchNewReleases = async (): Promise<void> => {
      const { entities: releases } = await getNewReleases()
      const shown = releases.slice(0, 6)
      setNewAlbums(shown)
    }
    const fetchTopSongs = async (): Promise<void> => {
      const { entities: songs } = await getTopTracks()
      setTopSongs(songs)
    }
    const fetchTopArtists = async (): Promise<void> => {
      const { entities: artists } = await getTopArtists()
      setTopArtists(artists)
    }
    const fetchFeaturedPlaylists = async (): Promise<void> => {
      const { entities: playlists } = await getFeaturedPlaylists()
      const shown = playlists.slice(0, 5)
      setFeaturesPlaylists(shown)
    }
    fetchCategoryPlaylists()
    fetchNewReleases()
    fetchTopSongs()
    fetchTopArtists()
    fetchFeaturedPlaylists()
  }, [])

  const carouselCards = categoryPlaylists.map(
    ({ id, name, images, description }) => ({
      title: name,
      subtitle: description,
      image: images ? images[0] : '',
      cta: (
        <IconButton
          title={strings.ui.listenTo}
          icon="fa-play"
          onClickCallback={() => playerContext.playPlaylist(id)}
        />
      ),
    }),
  )

  const navigate = useNavigate()
  const seeAllReleases = (): void => navigate('/new-releases')

  return isLoading ? (
    <BeatLoader />
  ) : (
    <Wrapper>
      <Carousel cards={carouselCards} />
      <MiddleContainer>
        <MediaSummaryMenu
          mediaList={newAlbums}
          btnClick={seeAllReleases}
          title={strings.headings.whatsNew}
          subtext={strings.content.seeWhatsPopping}
        />
        <TopPicks tracks={topSongs} artists={topArtists} />
      </MiddleContainer>
      <FeaturedPlaylists playlists={featuredPlaylists} />
    </Wrapper>
  )
}
