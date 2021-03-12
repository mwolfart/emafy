import React, { useEffect, useState, VFC } from 'react'
import { ToggleDescriptor } from 'components/ui/index'
import styled from 'styled-components'
import { Menu as MediaMenu } from 'components/media/menu/menu'
import { GlobalProps as StyledProps } from 'types/props'
import { strings } from 'strings'
import { getSavedAlbums, NextURL } from 'api/data'
import { Album } from 'types/media'
import { mainStyles } from 'styles'
import InfiniteScroll from 'react-infinite-scroll-component'

// TODO change this
const Wrapper = styled.div<StyledProps>`
  ${({ theme = mainStyles }: StyledProps) => `
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      flex-direction: row;
      height: 20%;
      padding: 20px 30px;
      font-family: ${theme.fontStyle};

      .description {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .title {
          color: ${theme.palette.colorTextTitle};
          font-size: ${theme.fontSizeTitle};
        }

        .subtitle {
          color: ${theme.palette.colorTextParagraph};
          font-size: ${theme.fontSizeParagraph};
        }
      }
    }

    .media-menu {
      padding-left: 20px;
      padding-right: 20px;
      opacity: 1;
      transition: ${theme.transitionQuickDelayed};
    }

    .media-menu-transition {
      padding-left: 20px;
      padding-right: 20px;
      opacity: 0;
      transition: ${theme.transitionQuick};
    }
  `}
`

export const SavedAlbums: VFC = () => {
  const [displayListView, setDisplayListView] = useState<boolean>(true)
  const [isTransitioning, setTransitioning] = useState<boolean>(false)
  const [nextURL, setNextURL] = useState<NextURL>(null)
  const [albums, setAlbums] = useState<Album[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  let transitionTimeout: NodeJS.Timeout

  const changeView = (isGrid: boolean): void => {
    setTransitioning(true)
    clearTimeout(transitionTimeout)
    transitionTimeout = setTimeout((): void => {
      setDisplayListView(isGrid)
      setTransitioning(false)
    }, 250)
  }

  // const scrollCheck = (event: React.UIEvent<HTMLDivElement>): void => {
  //   const bottom =
  //     event.currentTarget.scrollHeight - event.currentTarget.scrollTop ===
  //     event.currentTarget.clientHeight
  //   if (bottom && nextURL) {
  //     getSavedAlbums(nextURL).then(({ entities: albumList, next }) => {
  //       setAlbums(albums.concat(albumList))
  //       setNextURL(next)
  //     })
  //   }
  // }

  const fetchMoreAlbums = (): void => {
    getSavedAlbums(nextURL).then(({ entities: albumList, next }) => {
      setAlbums(albums.concat(albumList))
      setNextURL(next)
    })
  }

  useEffect(() => {
    getSavedAlbums(null).then(({ entities: albumList, next, total }) => {
      setAlbums(albumList)
      setTotalCount(total)
      setNextURL(next)
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
        <div className="header">
          <div className="description">
            <div className="title">{strings.scenes.albums.mySavedAlbums}</div>
            <div className="subtitle">
              {`${totalCount} ${
                totalCount > 1
                  ? strings.scenes.albums.subtextAlbums
                  : strings.scenes.albums.subtextAlbum
              }`}
            </div>
          </div>
          <ToggleDescriptor
            toggleState={displayListView}
            onChangeCallback={changeView}
            labelFalse={strings.scenes.albums.grid}
            labelTrue={strings.scenes.albums.list}
          />
        </div>
        <div
          className={isTransitioning ? 'media-menu-transition' : 'media-menu'}
        >
          <MediaMenu mediaList={albums} rowVariant={displayListView} />
        </div>
      </InfiniteScroll>
    </Wrapper>
  )
}
