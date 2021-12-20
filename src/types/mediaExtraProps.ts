import { Media } from './media'

export type MediaExtraProps = {
  mediaSnippetOpenCallback?: (media: Media) => void
  mediaSnippetCloseCallback?: () => void
  renderedAlbumSnippetId?: string
}
