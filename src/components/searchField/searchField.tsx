import { CleanButton } from 'components/ui'
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

const SearchButtonIcon = styled.i`
  ${({ theme = mainStyles }: GlobalProps) => `
    font-size: ${theme.fontSizeIcon};
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
      <CleanButton
        onClick={onSearchSong}
        aria-label={strings.components.searchButton}
      >
        <SearchButtonIcon className="fa fa-search" />
      </CleanButton>
      <SearchInput placeholder={strings.components.searchFieldPlaceholder} />
    </Wrapper>
  )
}
