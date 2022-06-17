import { useState, FC } from 'react'
import { useGetMediaList } from 'hooks/useGetMediaList'
import { Album, isAlbum, Media } from 'types/media'
import { strings } from 'strings'
import { BeatLoader } from 'components/loader'
import { MediaExtraProps } from 'types/mediaExtraProps'
import { Headline } from 'components/ui'
import styled from 'styled-components'
import { MediaMenu } from 'components/media/menu/menu'
import { getOwnSavedAlbums } from 'api/data/own'

const Wrapper = styled.div`
  ${({ theme }) => `
    padding: 0 ${theme.divSpacingBig};
    overflow: auto;
    height: 100%;
  `}
`

export const SavedAlbums: FC = () => {
  const savedMediaProps = useGetMediaList<Album>(getOwnSavedAlbums)
  const { totalCount, isLoading } = savedMediaProps
  const [renderedAlbumSnippetId, setRenderedAlbumSnippetId] =
    useState<string>('')

  const mediaTitle = strings.scenes.albums.mySavedAlbums
  const mediaCountLabel =
    totalCount === 1
      ? strings.scenes.albums.subtextAlbum
      : strings.scenes.albums.subtextAlbums
  const mediaSubtitle = `${totalCount} ${mediaCountLabel}`

  const mediaSnippetOpenCallback = (album: Media): void => {
    if (isAlbum(album)) {
      setRenderedAlbumSnippetId(album.id)
    }
  }

  const mediaSnippetCloseCallback = (): void => {
    setRenderedAlbumSnippetId('')
  }

  const extraProps: MediaExtraProps = {
    mediaSnippetOpenCallback,
    mediaSnippetCloseCallback,
    renderedMediaSnippetId: renderedAlbumSnippetId,
  }

  return isLoading ? (
    <BeatLoader />
  ) : (
    <Wrapper id="mainScreenWrapper">
      <Headline title={mediaTitle} subtitle={mediaSubtitle} />
      <MediaMenu {...savedMediaProps} extraProps={extraProps} />
    </Wrapper>
  )
}
