import { FC, useState } from 'react'
import { useGetMediaList } from 'hooks/useGetMediaList'
import { isPlaylist, Media, Playlist } from 'types/media'
import { strings } from 'strings'
import { BeatLoader } from 'components/loader'
import { Headline } from 'components/ui'
import styled from 'styled-components'
import { MediaMenu } from 'components/media/menu/menu'
import { getOwnPlaylists } from 'api/data/own'
import { MediaExtraProps } from 'types/mediaExtraProps'

const Wrapper = styled.div`
  ${({ theme }) => `
    padding: 0 ${theme.divSpacingBig};
    overflow: auto;
    height: 100%;
  `}
`

export const MyPlaylists: FC = () => {
  const savedMediaProps = useGetMediaList<Playlist>(getOwnPlaylists)
  const { totalCount, isLoading } = savedMediaProps

  const mediaTitle = strings.scenes.playlists.myPlaylists
  const mediaCountLabel =
    totalCount === 1
      ? strings.scenes.playlists.subtextPlaylist
      : strings.scenes.playlists.subtextPlaylists
  const mediaSubtitle = `${totalCount} ${mediaCountLabel}`

  const [renderedListSnippetId, setRenderedListSnippetId] = useState<string>('')

  const mediaSnippetOpenCallback = (list: Media): void => {
    if (isPlaylist(list)) {
      setRenderedListSnippetId(list.id)
    }
  }

  const mediaSnippetCloseCallback = (): void => {
    setRenderedListSnippetId('')
  }

  const extraProps: MediaExtraProps = {
    mediaSnippetOpenCallback,
    mediaSnippetCloseCallback,
    renderedMediaSnippetId: renderedListSnippetId,
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
