import { MediaMenuItem } from 'components/media/menu/item/item'
import {
  ContainerFlexRow,
  Headline,
  Button,
  ContainerFlexCol,
} from 'components/ui'
import { FC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'
import { Media } from 'types/media'

interface Props {
  mediaList: Media[]
  btnClick: () => void
  title: string
  subtext?: string
}

const Wrapper = styled(ContainerFlexCol)`
  flex-grow: 1;
`

const HeadlineContainer = styled(ContainerFlexRow)`
  ${({ theme }) => `
    gap: ${theme.divSpacingSmall};
    align-items: center;
  `}
`

const MediaGrid = styled.div`
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

export const MediaSummaryMenu: FC<Props> = ({
  mediaList,
  btnClick,
  title,
  subtext,
}) => (
  <Wrapper>
    <HeadlineContainer>
      <Headline title={title} subtitle={subtext} />
      <Button onClick={btnClick}>{strings.ui.seeAll}</Button>
    </HeadlineContainer>
    <MediaGrid>
      {mediaList.slice(0, 6).map((media) => (
        <MediaMenuItem key={media.id} mediaInfo={media} />
      ))}
    </MediaGrid>
  </Wrapper>
)
