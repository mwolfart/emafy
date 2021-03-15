import React, { useEffect, useState, VFC } from 'react'
import { ToggleDescriptor } from 'components/ui/index'
import styled from 'styled-components'
import { Menu as MediaMenu } from 'components/media/menu/menu'
import { GlobalProps, GlobalProps as StyledProps } from 'types/global'
import { strings } from 'strings'
import { getSavedAlbums, NextURL } from 'api/data'
import { Album } from 'types/media'
import { mainStyles } from 'styles'
import InfiniteScroll from 'react-infinite-scroll-component'

type MenuWrapperProps = {
  isTransitioning?: boolean
} & GlobalProps

const Wrapper = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
`

const Header = styled.div<StyledProps>`
  ${({ theme = mainStyles }: StyledProps) => `
      display: flex;
      flex-direction: row;
      height: 20%;
      padding: 20px 30px;
      font-family: ${theme.fontStyle};
  `}
`

const Description = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Title = styled.h1<StyledProps>`
  ${({ theme = mainStyles }: StyledProps) => `
    color: ${theme.palette.colorTextTitle};
    font-size: ${theme.fontSizeTitle};
    margin: 0;
  `}
`

const Subtitle = styled.h2<StyledProps>`
  ${({ theme = mainStyles }: StyledProps) => `
    color: ${theme.palette.colorTextParagraph};
    font-size: ${theme.fontSizeParagraph};
    margin: 0;
  `}
`

const MenuWrapper = styled.div<MenuWrapperProps>`
  ${({ isTransitioning, theme = mainStyles }: MenuWrapperProps) => `
      padding-left: 20px;
      padding-right: 20px;
      opacity: ${isTransitioning ? '0' : '1'};
      transition: ${
        isTransitioning ? theme.transitionQuick : theme.transitionQuickDelayed
      };
  `}
`

export const SavedAlbums: VFC = () => {
  const [isViewList, setIsViewList] = useState<boolean>(true)
  const [isTransitioning, setTransitioning] = useState<boolean>(false)
  const [nextURL, setNextURL] = useState<NextURL>(null)
  const [albums, setAlbums] = useState<Album[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  let transitionTimeout: NodeJS.Timeout

  const changeView = (isGrid: boolean): void => {
    setTransitioning(true)
    clearTimeout(transitionTimeout)
    transitionTimeout = setTimeout((): void => {
      setIsViewList(isGrid)
      setTransitioning(false)
    }, 250)
  }

  const fetchMoreAlbums = (): void => {
    getSavedAlbums(nextURL).then(({ entities: albumList, next }) => {
      setAlbums(albums.concat(albumList))
      setNextURL(next)
    })
  }

  useEffect(() => {
    getSavedAlbums()
      .then(({ entities: albumList, next, total }) => {
        setAlbums(albumList)
        setTotalCount(total)
        setNextURL(next)
      })
      .catch(() => {
        alert(strings.scenes.albums.errorLoadingAlbums)
      })
  }, [])

  return (
    <Wrapper>
      <InfiniteScroll
        dataLength={albums.length}
        next={fetchMoreAlbums}
        hasMore={albums.length < totalCount}
        loader={''}
      >
        <Header>
          <Description>
            <Title>{strings.scenes.albums.mySavedAlbums}</Title>
            <Subtitle>
              {`${totalCount} ${
                totalCount > 1
                  ? strings.scenes.albums.subtextAlbums
                  : strings.scenes.albums.subtextAlbum
              }`}
            </Subtitle>
          </Description>
          <ToggleDescriptor
            toggleState={isViewList}
            onChangeCallback={changeView}
            labelFalse={strings.scenes.albums.grid}
            labelTrue={strings.scenes.albums.list}
          />
        </Header>
        <MenuWrapper isTransitioning={isTransitioning}>
          <MediaMenu mediaList={albums} rowVariant={isViewList} />
        </MenuWrapper>
      </InfiniteScroll>
    </Wrapper>
  )
}
