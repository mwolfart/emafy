import { GrayIconButton } from 'components/ui'
import { FC } from 'react'
import { strings } from 'strings'
import styled, { useTheme } from 'styled-components'

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: row;
    color: ${theme.palette.colorGray600};
    padding: 0 ${theme.divSpacingBig};
    align-items: center;
    flex-grow: 1;
    transition: 0.5s;

    @media (max-width: 576px) {
      display: none;
    }

    &:hover {
      transform: scale(1.03);
    }
  `}
`

const SearchInput = styled.input`
  ${({ theme }) => `
    border: none;
    border-bottom: 2px solid ${theme.palette.colorGray300};
    flex-grow: 1;
    font-family: ${theme.fontStyle};
    color: ${theme.palette.colorGray600};
    height: ${theme.divSpacingBig};
    outline: none;
    margin: 0 ${theme.divSpacingSmall};
  `}
`

export const SearchField: FC = () => {
  const onSearchSong = (): void => {}
  const theme = useTheme()

  return (
    <Wrapper>
      <GrayIconButton
        iconClass="fa-search"
        onClickCallback={onSearchSong}
        iconSize={theme.fontSizeIcon}
      />
      <SearchInput
        placeholder={strings.components.topbar.searchFieldPlaceholder}
        aria-label={strings.components.topbar.searchSong}
      />
    </Wrapper>
  )
}
