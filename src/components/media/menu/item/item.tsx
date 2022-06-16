import { FC } from 'react'
import styled from 'styled-components'
import { isAlbum, isPlaylist, Media } from 'types/media'
import { MediaExtraProps } from 'types/mediaExtraProps'
import { AlbumCard } from 'snippets/album/card/card'
import { SnippetContainer } from 'components/media/snippet/container'
import { MediaLink } from '../link/link'
import { PlaylistCard } from 'snippets/playlist/card/card'

interface Props {
  mediaInfo: Media
  rowVariant?: boolean
  extraProps?: MediaExtraProps
}

const Wrapper = styled.div`
  position: relative;
`

export const MediaMenuItem: FC<Props> = ({
  mediaInfo,
  rowVariant,
  extraProps,
}) => {
  const shouldRenderAlbumSnippet =
    extraProps?.renderedMediaSnippetId === mediaInfo.id
  const snippetContent = isAlbum(mediaInfo) ? (
    <AlbumCard
      mediaInfo={mediaInfo}
      fnCloseSnippet={extraProps?.mediaSnippetCloseCallback}
    />
  ) : (
    isPlaylist(mediaInfo) && (
      <PlaylistCard
        playlistId={mediaInfo.id}
        fnCloseSnippet={extraProps?.mediaSnippetCloseCallback}
      />
    )
  )

  return (
    <Wrapper>
      <MediaLink
        mediaInfo={mediaInfo}
        rowVariant={rowVariant}
        extraProps={extraProps}
      />
      {shouldRenderAlbumSnippet && (
        <SnippetContainer rowVariant={rowVariant}>
          {snippetContent}
        </SnippetContainer>
      )}
    </Wrapper>
  )
}
