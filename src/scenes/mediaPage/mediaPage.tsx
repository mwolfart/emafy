import { ReactElement, useState } from 'react'
import { useGetMediaList } from 'hooks/useGetMediaList'
import { Media, PagedDataList } from 'types/media'
import { BeatLoader } from 'components/loader'
import { Headline } from 'components/ui'
import styled from 'styled-components'
import { MediaMenu } from 'components/media/menu/menu'
import { MediaExtraProps } from 'types/mediaExtraProps'
import { Nullable } from 'types/global'

interface Props<T> {
  fetchFn: (nextURL?: Nullable<string>) => Promise<PagedDataList<T>>
  title: string
  subtext: (x: number) => string
}

const Wrapper = styled.div`
  ${({ theme }) => `
    padding: 0 ${theme.divSpacingBig};
    overflow: auto;
    height: 100%;
  `}
`

export const MediaPage = <T extends Media>({
  fetchFn,
  title,
  subtext,
}: Props<T>): ReactElement => {
  const savedMediaProps = useGetMediaList<T>(fetchFn)
  const { totalCount, isLoading } = savedMediaProps
  const [renderedListSnippetId, setRenderedListSnippetId] = useState<string>('')

  const mediaSnippetOpenCallback = (media: Media): void => {
    setRenderedListSnippetId(media.id)
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
      <Headline title={title} subtitle={subtext(totalCount)} />
      <MediaMenu {...savedMediaProps} extraProps={extraProps} />
    </Wrapper>
  )
}
