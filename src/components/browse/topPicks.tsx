import { MediaListLink } from 'components/media/listLink/listLink'
import { ContainerFlexCol, Rectangle, TitleLarge } from 'components/ui'
import { FC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'
import { SimpleArtist, Song } from 'types/media'

interface Props {
  tracks: Song[]
  artists: SimpleArtist[]
}

const TopPicksRectangle = styled(Rectangle)`
  flex-basis: 35%;
`

const TopPicksScroller = styled(ContainerFlexCol)`
  ${({ theme }) => `
    max-height: 280px;
    overflow: auto;
    padding: 0 ${theme.divSpacingMedium};
    margin: ${theme.divSpacingMedium} 0;
  `}
`

export const TopPicks: FC<Props> = ({ tracks, artists }) => (
  <TopPicksRectangle>
    <TitleLarge>{strings.headings.topSongs}</TitleLarge>
    <TopPicksScroller>
      {tracks.map((song) => (
        <MediaListLink key={song.id} mediaInfo={song} />
      ))}
    </TopPicksScroller>
    <TitleLarge>{strings.headings.topArtists}</TitleLarge>
    <TopPicksScroller>
      {artists.map((artist) => (
        <MediaListLink key={artist.id} mediaInfo={artist} />
      ))}
    </TopPicksScroller>
  </TopPicksRectangle>
)
