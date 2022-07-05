import { searchTerm } from 'api/data/browse'
import { BeatLoader } from 'components/loader'
import { MediaSummaryMenu } from 'components/media/summaryMenu/summaryMenu'
import { ContainerFlexCol } from 'components/ui'
import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { strings } from 'strings'
import styled from 'styled-components'
import { Song, SimpleArtist, Album, Playlist } from 'types/media'

type RouteParams = {
  term: string
}

const Wrapper = styled.div`
  ${({ theme }) => `
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.divSpacingBig};
    padding: ${theme.divSpacingBig};
    height: 100%;
    overflow: auto;
  `}
`

const NotFoundWrapper = styled(ContainerFlexCol)`
  ${({ theme }) => `
    text-align: center;
    color: ${theme.palette.colorGray500};
    font-size: ${theme.fontSizeTitle};
    font-family: ${theme.fontStyle};
    gap: ${theme.divSpacingMedium};
    height: 100%;
    padding: ${theme.divSpacingExtraBig};
    @media (max-width: 768px) {
      font-size: ${theme.fontSizeTitleResponsive};
    }
    @media (max-width: 576px) {
      font-size: ${theme.fontSizeParagraph};
    }
  `}
`

export const Search: FC = () => {
  const { term } = useParams<RouteParams>()
  const [isLoading, setIsLoading] = useState(true)
  const [foundTracks, setFoundTracks] = useState<Song[]>([])
  const [foundArtists, setFoundArtists] = useState<SimpleArtist[]>([])
  const [foundAlbums, setFoundAlbums] = useState<Album[]>([])
  const [foundPlaylists, setFoundPlaylists] = useState<Playlist[]>([])
  const [totalTracks, setTotalTracks] = useState(0)
  const [totalArtists, setTotalArtists] = useState(0)
  const [totalAlbums, setTotalAlbums] = useState(0)
  const [totalPlaylists, setTotalPlaylists] = useState(0)
  const navigate = useNavigate()
  const noResultsFound =
    [foundTracks, foundArtists, foundAlbums, foundPlaylists].flat().length === 0
  useEffect(() => {
    const fetch = async (): Promise<void> => {
      if (term) {
        const { tracks, artists, albums, playlists } = await searchTerm(term)
        if (tracks && artists && albums && playlists) {
          setFoundTracks(tracks.entities)
          setFoundArtists(artists.entities)
          setFoundAlbums(albums.entities)
          setFoundPlaylists(playlists.entities)
          setTotalTracks(tracks.total)
          setTotalArtists(artists.total)
          setTotalAlbums(albums.total)
          setTotalPlaylists(playlists.total)
        }
        setIsLoading(false)
      }
    }
    fetch()
  }, [term])

  if (isLoading) {
    return <BeatLoader />
  }
  if (noResultsFound) {
    return (
      <NotFoundWrapper>
        <i className="fa-solid fa-face-sad-tear fa-4x" />
        {strings.error.noResults}
      </NotFoundWrapper>
    )
  }
  return (
    <Wrapper>
      {foundTracks.length > 0 && (
        <MediaSummaryMenu
          mediaList={foundTracks}
          btnClick={() => navigate(`/search-tracks/${term}`)}
          title={strings.headings.tracksFound}
          subtext={strings.ui.xTracks(totalTracks)}
        />
      )}
      {foundArtists.length > 0 && (
        <MediaSummaryMenu
          mediaList={foundArtists}
          btnClick={() => navigate(`/search-artists/${term}`)}
          title={strings.headings.artistsFound}
          subtext={strings.ui.xArtists(totalArtists)}
        />
      )}
      {foundAlbums.length > 0 && (
        <MediaSummaryMenu
          mediaList={foundAlbums}
          btnClick={() => navigate(`/search-albums/${term}`)}
          title={strings.headings.albumsFound}
          subtext={strings.ui.xAlbums(totalAlbums)}
        />
      )}
      {foundPlaylists.length > 0 && (
        <MediaSummaryMenu
          mediaList={foundPlaylists}
          btnClick={() => navigate(`/search-playlists/${term}`)}
          title={strings.headings.playlistsFound}
          subtext={strings.ui.xPlaylists(totalPlaylists)}
        />
      )}
    </Wrapper>
  )
}
