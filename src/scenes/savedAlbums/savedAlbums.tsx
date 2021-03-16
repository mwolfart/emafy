import { useEffect, useState, VFC } from 'react'
import { ToggleDescriptor } from 'components/ui/index'
import styled from 'styled-components'
import { Menu as MediaMenu } from 'components/media/menu/menu'
import { GlobalProps, GlobalProps as StyledProps } from 'types/global'
import { strings } from 'strings'
import { getSavedAlbums, NextURL } from 'api/data'
import { Album } from 'types/media'
import { mainStyles } from 'styles'
import InfiniteScroll from 'react-infinite-scroll-component'
import { SubtitleBig, TitleBig } from 'components/ui/heading'

type MenuWrapperProps = {
  isTransitioning?: boolean
} & GlobalProps

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

const Wrapper = styled.div<MenuWrapperProps>`
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

  const albumCountText =
    totalCount === 1
      ? strings.scenes.albums.subtextAlbum
      : strings.scenes.albums.subtextAlbums

  return (
    <InfiniteScroll
      dataLength={albums.length}
      next={fetchMoreAlbums}
      hasMore={albums.length < totalCount && nextURL !== null}
      loader={'Loading...'}
    >
      <Header>
        <Description>
          <TitleBig>{strings.scenes.albums.mySavedAlbums}</TitleBig>
          <SubtitleBig>{`${totalCount} ${albumCountText}`}</SubtitleBig>
        </Description>
        <ToggleDescriptor
          toggleState={isViewList}
          onChangeCallback={changeView}
          labelFalse={strings.scenes.albums.grid}
          labelTrue={strings.scenes.albums.list}
        />
      </Header>
      <Wrapper isTransitioning={isTransitioning}>
        <MediaMenu mediaList={albums} rowVariant={isViewList} />
      </Wrapper>
    </InfiniteScroll>
  )
}
