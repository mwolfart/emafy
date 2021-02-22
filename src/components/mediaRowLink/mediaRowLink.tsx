import { VFC } from 'react'
import styled from 'styled-components'
import { Album, Media } from 'types/media'

type Props = {
  mediaInfo: Media
}

const MediaRow = styled.a`
  display: flex;
  flex-direction: row;
  font-family: ${(props) => props.theme.fontStyle};
  text-decoration: unset;
  padding: 10px;
  margin: 10px;
  border-radius: 16px;
  border-width: 0px;
  background-color: ${(props) => props.theme.colorDarkerBackground};
  transition: background-color 0.25s ease;

  &:hover {
    background-color: ${(props) => props.theme.colorDarkerBackgroundHover};
    transition: background-color 0.25s ease;
  }

  img {
    width: 100px;
    height: 100px;
    background-color: ${(props) => props.theme.colorImageBackground};
    border-radius: 16px;
    border-width: 0px;
    line-height: 50px;
    text-align: center;
    overflow: hidden;
  }

  & .description {
    display: flex;
    flex-direction: column;
    text-align: left;
    font-weight: 600;
    padding-left: 10px;

    & .title {
      color: ${(props) => props.theme.colorTextTitle};
      font-size: 16px;
      line-height: 36px;
    }

    & .subtitle {
      color: ${(props) => props.theme.colorTextDisabled};
      font-size: 12px;
      line-height: 12px;
    }
  }
`

export const MediaRowLink: VFC<Props> = ({ mediaInfo }) => {
  return (
    <MediaRow href="">
      <img
        src={mediaInfo.images && mediaInfo.images[0]}
        alt={mediaInfo.name}
      ></img>
      <div className="description">
        <div className="title">{mediaInfo.name}</div>
        {(mediaInfo as Album).artists && (
          <div className="subtitle">
            {(mediaInfo as Album).artists
              .map((artist: Media) => artist.name)
              .reduce((accum: String, name: String) => `${accum}, ${name}`)}
          </div>
        )}
      </div>
    </MediaRow>
  )
}
