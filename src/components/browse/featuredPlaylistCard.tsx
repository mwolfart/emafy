import {
  ContainerFlexRow,
  FooterHeadline,
  Headline,
  IconButton,
  Rectangle,
} from 'components/ui'
import { PlayerContext } from 'contexts/player'
import { FC, useContext } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'
import { Playlist } from 'types/media'
import { abbreviateText } from 'utils/utils'

interface Props {
  playlist: Playlist
}

const Wrapper = styled(Rectangle)`
  width: 200px;
`

const Dash = styled.div`
  border-top: 2px solid #ddd;
`

export const FeaturedPlaylistCard: FC<Props> = ({ playlist }) => {
  const artist = playlist.owner
  const player = useContext(PlayerContext)
  const trackCountLabel = `${playlist.totalTracks} ${strings.scenes.discover.tracks}`
  return (
    <Wrapper>
      <ContainerFlexRow>
        <Headline
          title={abbreviateText(playlist.name, 20)}
          subtitle={trackCountLabel}
          smaller={true}
        />
        <IconButton
          icon="fa-play"
          onClickCallback={() => player.playPlaylist(playlist.id)}
          ariaLabel={strings.scenes.discover.playPlaylist}
        />
      </ContainerFlexRow>
      <Dash />
      <FooterHeadline title={artist} />
    </Wrapper>
  )
}
