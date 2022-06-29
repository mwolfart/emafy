import {
  Button,
  ContainerFlexCol,
  ContainerFlexRow,
  Headline,
} from 'components/ui'
import { FC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'
import { Playlist } from 'types/media'
import { FeaturedPlaylistCard } from './featuredPlaylistCard'
import { Link as RouterLink } from 'react-router-dom'

interface Props {
  playlists: Playlist[]
}

const PlaylistScroller = styled.div`
  overflow: auto;'
`

const HeadlineContainer = styled(ContainerFlexRow)`
  ${({ theme }) => `
    margin: 0 ${theme.divSpacingExtraBig};
    gap: ${theme.divSpacingSmall};
    align-items: center;
  `}
`

const PlaylistList = styled(ContainerFlexRow)`
  ${({ theme }) => `
    margin: ${theme.divSpacingMedium} ${theme.divSpacingExtraBig} ${theme.divSpacingExtraBig}; 
    gap: ${theme.divSpacingMedium};
    width: fit-content;
  `}
`

export const FeaturedPlaylists: FC<Props> = ({ playlists }) => (
  <ContainerFlexCol>
    <HeadlineContainer>
      <Headline
        title={strings.headings.popularPlaylists}
        subtitle={strings.content.seeWhatsPopping}
      />
      <RouterLink to="/popular-playlists">
        <Button>{strings.ui.seeAll}</Button>
      </RouterLink>
    </HeadlineContainer>
    <PlaylistScroller>
      <PlaylistList>
        {playlists.map((playlist) => (
          <FeaturedPlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </PlaylistList>
    </PlaylistScroller>
  </ContainerFlexCol>
)
