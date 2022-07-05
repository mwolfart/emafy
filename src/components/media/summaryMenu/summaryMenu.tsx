import { MediaMenuItem } from 'components/media/menu/item/item'
import {
  ContainerFlexRow,
  Headline,
  Button,
  ContainerFlexCol,
} from 'components/ui'
import { FC } from 'react'
import { useMediaQuery } from 'react-responsive'
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
    }
    @media (min-width: 769px) and (max-width: 999px), (max-width: 460px) {
      grid-template-columns: 1fr;
    }
  `}
`

export const MediaSummaryMenu: FC<Props> = ({
  mediaList,
  btnClick,
  title,
  subtext,
}) => {
  const isSmall = useMediaQuery({
    query: '(min-width: 999px) and (max-width: 1300px), (max-width: 768px)',
  })
  const isSmaller = useMediaQuery({
    query: '(min-width: 769px) and (max-width: 999px), (max-width: 460px)',
  })
  const displayedMedia = mediaList.slice(0, isSmaller ? 2 : isSmall ? 4 : 6)
  return (
    <Wrapper>
      <HeadlineContainer>
        <Headline title={title} subtitle={subtext} />
        <Button onClick={btnClick}>{strings.ui.seeAll}</Button>
      </HeadlineContainer>
      <MediaGrid>
        {displayedMedia.map((media) => (
          <MediaMenuItem key={media.id} mediaInfo={media} />
        ))}
      </MediaGrid>
    </Wrapper>
  )
}
