import { searchTerm } from 'api/data/browse'
import { BeatLoader } from 'components/loader'
import { MediaSummaryMenu } from 'components/media/summaryMenu/summaryMenu'
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

export const Search: FC = () => {
  const params = useParams<RouteParams>()
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
  useEffect(() => {
    const fetch = async (): Promise<void> => {
      if (params.term) {
        const { tracks, artists, albums, playlists } = await searchTerm(
          params.term,
        )
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
  }, [])

  return isLoading ? (
    <BeatLoader />
  ) : (
    <Wrapper>
      <MediaSummaryMenu
        mediaList={foundTracks}
        btnClick={() => navigate(`/search-tracks/${params.term}`)}
        title={strings.headings.tracksFound}
        subtext={strings.ui.xTracks(totalTracks)}
      />
      <MediaSummaryMenu
        mediaList={foundArtists}
        btnClick={() => navigate(`/search-artists/${params.term}`)}
        title={strings.headings.artistsFound}
        subtext={strings.ui.xArtists(totalArtists)}
      />
      <MediaSummaryMenu
        mediaList={foundAlbums}
        btnClick={() => navigate(`/search-albums/${params.term}`)}
        title={strings.headings.albumsFound}
        subtext={strings.ui.xAlbums(totalAlbums)}
      />
      <MediaSummaryMenu
        mediaList={foundPlaylists}
        btnClick={() => navigate(`/search-playlists/${params.term}`)}
        title={strings.headings.playlistsFound}
        subtext={strings.ui.xPlaylists(totalPlaylists)}
      />
    </Wrapper>
  )
}
