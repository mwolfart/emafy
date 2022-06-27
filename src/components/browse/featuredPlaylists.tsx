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
        title={strings.scenes.discover.playlists}
        subtitle={strings.scenes.discover.whatsNewSubtitle}
      />
      <Button>{strings.scenes.discover.seeAll}</Button>
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
