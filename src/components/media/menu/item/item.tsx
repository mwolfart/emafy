import { VFC } from 'react'
import styled from 'styled-components'
import { isAlbum, Media } from 'types/media'
import { MediaExtraProps } from 'types/mediaExtraProps'
import { AlbumCard } from 'snippets/album/card/card'
import { AlbumSnippetContainer } from 'components/media/album/snippetContainer/snippetContainer'
import { MediaLink } from '../link/link'

type Props = {
  mediaInfo: Media
  rowVariant?: boolean
  extraProps?: MediaExtraProps
}

const Wrapper = styled.div`
  position: relative;
`

export const MediaMenuItem: VFC<Props> = ({
  mediaInfo,
  rowVariant,
  extraProps,
}) => {
  const shouldRenderAlbumSnippet =
    extraProps?.renderedAlbumSnippetId === mediaInfo.id && isAlbum(mediaInfo)

  return (
    <Wrapper>
      <MediaLink
        mediaInfo={mediaInfo}
        rowVariant={rowVariant}
        extraProps={extraProps}
      />
      {shouldRenderAlbumSnippet && (
        <AlbumSnippetContainer rowVariant={rowVariant}>
          <AlbumCard
            albumInfo={mediaInfo}
            fnCloseSnippet={extraProps?.mediaSnippetCloseCallback}
          />
        </AlbumSnippetContainer>
      )}
    </Wrapper>
  )
}
