import { VFC } from 'react'
import styled from 'styled-components'
import { Album, Media } from 'types/media'

type Props = {
  mediaInfo: Media
}

const MediaSquare = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fontStyle};
  text-decoration: unset;
  padding: 20px;
  max-width: 210px;
  transition: 0.3s ease;
  transform: scale(1);

  &:hover {
    transition: 0.3s ease;
    transform: scale(1.1);

    img {
      box-shadow: 0px 60px 80px #00000045;
    }
  }

  img {
    width: 200px;
    height: 200px;
    box-shadow: 0px 60px 80px #0000002a;
    background-color: ${(props) => props.theme.colorImageBackground};
    border-radius: 16px;
    border-width: 0px;
    line-height: 200px;
    text-align: center;
    overflow: hidden;
  }

  & .title {
    color: ${(props) => props.theme.colorTextTitle};
    width: 100%;
    padding-left: 10px;
    text-align: left;
    font-weight: 600;
    font-size: 16px;
    line-height: 36px;
  }

  & .subtitle {
    color: ${(props) => props.theme.colorTextDisabled};
    width: 100%;
    padding-left: 10px;
    text-align: left;
    font-weight: 600;
    font-size: 12px;
    line-height: 12px;
  }
`

export const MediaSquareLink: VFC<Props> = ({ mediaInfo }) => {
  return (
    <MediaSquare href="">
      <img
        src={mediaInfo.images && mediaInfo.images[0]}
        alt={mediaInfo.name}
      ></img>
      <div className="title">{mediaInfo.name}</div>
      {(mediaInfo as Album).artists && (
        <div className="subtitle">
          {(mediaInfo as Album).artists
            .map((artist: Media) => artist.name)
            .reduce((accum: String, name: String) => `${accum}, ${name}`)}
        </div>
      )}
    </MediaSquare>
  )
}
