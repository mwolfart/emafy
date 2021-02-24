import { MediaRowLink } from 'components/mediaRowLink/mediaRowLink'
import React from 'react'
import { VFC } from 'react'
import styled from 'styled-components'
import { Media } from 'types/media'

type Props = {
  mediaList: Media[]
}

const MediaList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`

export const MediaListMenu: VFC<Props> = ({ mediaList }) => {
  return (
    <MediaList>
      {mediaList.map((media: Media) => (
        <MediaRowLink key={media.id} mediaInfo={media} />
      ))}
    </MediaList>
  )
}
