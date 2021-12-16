import { useState, VFC } from 'react'
import { getOwnSavedAlbums } from 'api/data'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
import { Page as MediaPage } from 'components/media/menu/page/page'
import { Album, isAlbum, Media } from 'types/media'
import { strings } from 'strings'
import { BeatLoader } from 'components/loader'
import { MediaExtraProps } from 'types/mediaExtraProps'

export const SavedAlbums: VFC = () => {
  const savedMediaProps = useGetSavedMedia<Album>(getOwnSavedAlbums)
  const { totalCount, isLoading } = savedMediaProps
  const [renderedAlbumSnippetId, setRenderedAlbumSnippetId] =
    useState<string>('')

  const mediaTitle = strings.scenes.albums.mySavedAlbums
  const mediaCountLabel =
    totalCount === 1
      ? strings.scenes.albums.subtextAlbum
      : strings.scenes.albums.subtextAlbums

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
    renderedAlbumSnippetId,
  }

  return isLoading ? (
    <BeatLoader />
  ) : (
    <MediaPage
      {...savedMediaProps}
      pageTitle={mediaTitle}
      mediaCountLabel={mediaCountLabel}
      extraProps={extraProps}
    />
  )
}
