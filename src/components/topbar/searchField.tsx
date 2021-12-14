import { GrayIconButton } from 'components/ui'
import { VFC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'

const Wrapper = styled.div`
  ${({ theme = mainStyles }: GlobalProps) => `
    display: flex;
    flex-direction: row;
    color: ${theme.palette.colorTextDisabled};
    padding: 0 ${theme.divSpacingBig};
    align-items: center;
    width: 70%;
    transition: 0.5s;

    @media (max-width: 576px) {
      width: 100%;
    }

    &:hover {
      transform: scale(1.03);
    }
  `}
`

const SearchInput = styled.input`
  ${({ theme = mainStyles }: GlobalProps) => `
    border: none;
    border-bottom: 2px solid ${theme.palette.colorTextSubtitleLarge};
    flex-grow: 1;
    font-family: ${theme.fontStyle};
    color: ${theme.palette.colorTextDisabled};
    height: ${theme.divSpacingBig};
    outline: none;
    margin: 0 ${theme.divSpacingSmall};
  `}
`

export const SearchField: VFC = () => {
  const onSearchSong = (): void => {}

  return (
    <Wrapper>
      <GrayIconButton iconClass="fa-search" onClickCallback={onSearchSong} />
      <SearchInput
        placeholder={strings.components.topbar.searchFieldPlaceholder}
        aria-label={strings.components.topbar.searchSong}
      />
    </Wrapper>
  )
}