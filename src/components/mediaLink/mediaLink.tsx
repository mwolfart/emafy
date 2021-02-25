import { VFC } from 'react'
import styled from 'styled-components'
import { Album, Media } from 'types/media'

type Props = {
  mediaInfo: Media
  rowVariant?: boolean
}

type DescriptionWrapperProps = {
  rowVariant?: boolean
}

const MediaLinkBlock = styled.a`
  display: flex;
  flex-direction: column;
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
`

const Title = styled.h3`
  color: ${(props) => props.theme.colorTextTitle};
  width: 100%;
  padding-left: 10px;
  text-align: left;
  font-weight: 600;
  font-size: 16px;
  line-height: 36px;
  margin: 0;
`

const SubTitle = styled.h4`
  color: ${(props) => props.theme.colorTextDisabled};
  width: 100%;
  padding-left: 10px;
  text-align: left;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  margin: 0;
`

const DescriptionWrapper = styled.div<DescriptionWrapperProps>``

export const MediaLink: VFC<Props> = ({
  mediaInfo,
  rowVariant: isRowVariant,
}) => {
  return (
    <MediaLinkBlock href="">
      <img src={mediaInfo.images && mediaInfo.images[0]} alt={mediaInfo.name} />
      <DescriptionWrapper rowVariant={isRowVariant}>
        <Title>{mediaInfo.name}</Title>
        {(mediaInfo as Album).artists && (
          <SubTitle>
            {(mediaInfo as Album).artists
              .map((artist: Media) => artist.name)
              .reduce((accum: String, name: String) => `${accum}, ${name}`)}
          </SubTitle>
        )}
      </DescriptionWrapper>
    </MediaLinkBlock>
  )
}
