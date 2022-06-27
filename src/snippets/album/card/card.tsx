import { useCallback, FC, useContext } from 'react'
import { GrayIconButton, Headline, IconButton, Rectangle } from 'components/ui'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled, { useTheme } from 'styled-components'
import { BeatLoader } from 'components/loader'
import { useGetMediaList } from 'hooks/useGetMediaList'
import { strings } from 'strings'
import { getAlbumTracks } from 'api/data/albums'
import { NextURL } from 'types/global'
import { Album } from 'types/media'
import { PlayerContext } from 'contexts/player'
import { SnippetTrack } from 'components/media/snippet/track'

interface Props {
  mediaInfo: Album
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

const Footer = styled.div`
  ${({ theme }) => `
    text-align: center;
    color: ${theme.palette.colorPrimary};
    font-weight: bold;
    padding-top: ${theme.divSpacingMedium};
  `}
`

export const AlbumCard: FC<Props> = ({ mediaInfo, fnCloseSnippet }) => {
  const theme = useTheme()
  const playerContext = useContext(PlayerContext)
  const playMedia = (): void => playerContext.playAlbum(mediaInfo.id)
  const getTracksCallback = useCallback(
    (next?: NextURL) => getAlbumTracks(mediaInfo, next),
    [mediaInfo],
  )
  const {
    mediaList: trackList,
    fetchMoreMedia: fetchMoreTracks,
    nextURL,
    isLoading,
  } = useGetMediaList(getTracksCallback)
  const { totalTracks } = mediaInfo
  return (
    <Rectangle>
      {fnCloseSnippet && (
        <GrayIconButton
          iconClass="fa-times"
          onClickCallback={fnCloseSnippet}
          ariaLabel={strings.components.modal.closeModal}
          iconSize={theme.fontSizeIcon}
        />
      )}
      <HeadlineWrapper>
        <Headline title={mediaInfo.name} subtitle={mediaInfo.artists[0].name} />
        <IconButton
          title={strings.components.player.play}
          icon="fa-play"
          onClickCallback={playMedia}
        />
      </HeadlineWrapper>
      <Dash />
      {isLoading ? (
        <BeatLoader />
      ) : (
        <ScrollWrapper id="tracksScrollWrapper">
          <InfiniteScroll
            dataLength={trackList.length}
            next={fetchMoreTracks}
            hasMore={trackList.length < totalTracks && nextURL !== null}
            loader={<BeatLoader />}
            scrollableTarget="tracksScrollWrapper"
          >
            {trackList.map((track) => (
              <SnippetTrack key={track.id} track={track} />
            ))}
          </InfiniteScroll>
        </ScrollWrapper>
      )}
      <Dash />
      <Footer>Show Related</Footer>
    </Rectangle>
  )
}
