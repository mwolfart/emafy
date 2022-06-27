import { MediaMenuItem } from 'components/media/menu/item/item'
import { ContainerFlexRow, Headline, Button } from 'components/ui'
import { FC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'
import { Album } from 'types/media'

interface Props {
  albumList: Album[]
}

const Wrapper = styled.div`
  flex-basis: 65%;
  border-top: 2px solid #ddd;
`

const HeadlineContainer = styled(ContainerFlexRow)`
  ${({ theme }) => `
    gap: ${theme.divSpacingSmall};
  `}
`

const FeaturedAlbumsMenu = styled.div`
  ${({ theme }) => `
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
    padding: ${theme.divSpacingMedium} 0;
    @media (min-width: 999px) and (max-width: 1300px), (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      & > div:nth-last-child(-n + 2) {
        display: none;
      }
    }
    @media (min-width: 769px) and (max-width: 999px), (max-width: 460px) {
      grid-template-columns: 1fr;
      & > div:nth-last-child(-n + 4) {
        display: none;
      }
    }
  `}
`

export const ReleasesMenu: FC<Props> = ({ albumList }) => (
  <Wrapper>
    <HeadlineContainer>
      <Headline
        title={strings.scenes.discover.whatsNew}
        subtitle={strings.scenes.discover.whatsNewSubtitle}
      />
      <Button>{strings.scenes.discover.seeAll}</Button>
    </HeadlineContainer>
    <FeaturedAlbumsMenu>
      {albumList.map((album) => (
        <MediaMenuItem key={album.id} mediaInfo={album} />
      ))}
    </FeaturedAlbumsMenu>
  </Wrapper>
)
