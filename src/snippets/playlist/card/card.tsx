import { FC, useContext, useEffect, useState } from 'react'
import { GrayIconButton, Headline, IconButton, Rectangle } from 'components/ui'
import styled from 'styled-components'
import { BeatLoader } from 'components/loader'
import { strings } from 'strings'
import { DetailedPlaylist } from 'types/media'
import { PlayerContext } from 'contexts/player'
import { getPlaylist } from 'api/data/playlist'
import { SnippetTrack } from 'components/media/snippet/track'

interface Props {
  playlistId: string
  fnCloseSnippet?: () => void
}

const Dash = styled.div`
  ${({ theme }) => `
    border-bottom: 2px solid ${theme.palette.colorTextSubtitleLarge};
  `}
`

const ScrollWrapper = styled.div`
  max-height: 400px;
  overflow-y: scroll;
`

const HeadlineWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const PlaylistCard: FC<Props> = ({ playlistId, fnCloseSnippet }) => {
  const playerContext = useContext(PlayerContext)
  const playMedia = (): void => playerContext.playPlaylist(playlistId)
  const [isLoading, setIsLoading] = useState(true)
  const [playlistDetails, setPlaylistDetails] = useState<DetailedPlaylist>()
  useEffect(() => {
    getPlaylist(playlistId).then(({ entities: playlist }) => {
      setPlaylistDetails(playlist)
      setIsLoading(false)
    })
  }, [])
  return (
    <Rectangle>
      {fnCloseSnippet && (
        <GrayIconButton
          iconClass="fa-times"
          onClickCallback={fnCloseSnippet}
          ariaLabel={strings.components.modal.closeModal}
        />
      )}
      {isLoading || !playlistDetails ? (
        <BeatLoader />
      ) : (
        <>
          <HeadlineWrapper>
            <Headline title={playlistDetails.name} />
            <IconButton
              title={strings.components.player.play}
              icon="fa-play"
              onClickCallback={playMedia}
            />
          </HeadlineWrapper>
          <Dash />
          <ScrollWrapper>
            {playlistDetails.tracks.map((track) => (
              <SnippetTrack key={track.id} track={track} />
            ))}
          </ScrollWrapper>
        </>
      )}
    </Rectangle>
  )
}
