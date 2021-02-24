import React, { useState, VFC } from 'react'
import { ToggleButton } from 'components/ui/toggleButton/toggleButton'
import { MediaGridMenu } from 'components/mediaGridMenu/mediaGridMenu'
import { MediaListMenu } from 'components/mediaListMenu/mediaListMenu'
import styled from 'styled-components'
import { albumList } from 'example'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    flex-direction: row;
    height: 20%;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 20px;
    font-family: ${(props) => props.theme.fontStyle};

    .description {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      .title {
        color: ${(props) => props.theme?.colorTextTitle};
        font-size: ${(props) => props.theme?.fontSizeTitle};
      }

      .subtitle {
        color: ${(props) => props.theme?.colorTextParagraph};
        font-size: ${(props) => props.theme?.fontSizeParagraph};
      }
    }
  }

  .media-menu {
    opacity: 1;
    transition: 0.25s ease 0.2s;
  }

  .media-menu-transition {
    opacity: 0;
    transition: 0.25s ease;
  }
`

export const SavedAlbums: VFC = () => {
  const [displayGridView, setDisplayGridView] = useState<boolean>(true)
  const [isTransitioning, setTransitioning] = useState<boolean>(false)
  let transitionTimeout: NodeJS.Timeout

  const changeView = (isGrid: boolean): void => {
    setTransitioning(true)
    clearTimeout(transitionTimeout)
    transitionTimeout = setTimeout((): void => {
      setDisplayGridView(isGrid)
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
          toggleState={displayGridView}
          onChangeCallback={changeView}
        />
      </div>
      <div className={isTransitioning ? 'media-menu-transition' : 'media-menu'}>
        {displayGridView ? (
          <MediaGridMenu mediaList={albumList} />
        ) : (
          <MediaListMenu mediaList={albumList} />
        )}
      </div>
    </Wrapper>
  )
}
