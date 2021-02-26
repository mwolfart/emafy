import React, { useState, VFC } from 'react'
import { ToggleButton } from 'components/ui/toggleButton/toggleButton'
import styled from 'styled-components'
import { albumList } from 'example'
import { MediaMenu } from 'components/mediaMenu/mediaMenu'
import { GlobalProps as StyledProps } from 'types/props'

const Wrapper = styled.div<StyledProps>`
  ${({ theme }: StyledProps) => `
    display: flex;
    flex-direction: column;

    .header {
      display: flex;
      flex-direction: row;
      height: 20%;
      padding: 20px 30px;
      font-family: ${theme?.fontStyle};

      .description {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .title {
          color: ${theme?.palette.colorTextTitle};
          font-size: ${theme?.fontSizeTitle};
        }

        .subtitle {
          color: ${theme?.palette.colorTextParagraph};
          font-size: ${theme?.fontSizeParagraph};
        }
      }
    }

    .media-menu {
      padding-left: 20px;
      padding-right: 20px;
      opacity: 1;
      transition: ${theme?.transitionQuickDelayed};
    }

    .media-menu-transition {
      padding-left: 20px;
      padding-right: 20px;
      opacity: 0;
      transition: ${theme?.transitionQuick};
    }
  `}
`

export const SavedAlbums: VFC = () => {
  const [displayListView, setDisplayListView] = useState<boolean>(true)
  const [isTransitioning, setTransitioning] = useState<boolean>(false)
  let transitionTimeout: NodeJS.Timeout

  const changeView = (isGrid: boolean): void => {
    setTransitioning(true)
    clearTimeout(transitionTimeout)
    transitionTimeout = setTimeout((): void => {
      setDisplayListView(isGrid)
      setTransitioning(false)
    }, 250)
  }

  return (
    <Wrapper>
      <div className="header">
        <div className="description">
          <div className="title">My saved albums</div>
          <div className="subtitle">{albumList.length} albums</div>
        </div>
        <ToggleButton
          toggleState={displayListView}
          onChangeCallback={changeView}
        />
      </div>
      <div className={isTransitioning ? 'media-menu-transition' : 'media-menu'}>
        <MediaMenu mediaList={albumList} rowVariant={displayListView} />
      </div>
    </Wrapper>
  )
}
