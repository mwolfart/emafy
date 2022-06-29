import {
  ContainerFlexCol,
  ContainerFlexRow,
  GrayIconButton,
} from 'components/ui'
import { FC, useState } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'
import { CarouselItem } from './carouselItem'

interface Props {
  cards: Array<{
    title: string
    subtitle: string
    image: string
    cta: JSX.Element
  }>
}

interface StyledProps {
  activeCard: number
}

const CarouselScroller = styled(ContainerFlexRow)<StyledProps>`
  ${({ activeCard, theme }) => {
    const translationDesktop = `calc(-1 * (70vw + ${theme.divSpacingSmall}) 
      * ${activeCard + 1} + 60px)`
    const translationMobile = `calc(-1 * 100% * ${activeCard})`
    return `
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      gap: ${theme.divSpacingSmall};
      width: fit-content;
      transform: translateX(${translationDesktop});
      transition: 1s;
      @media (max-width: 768px) {
        width: 100%;
        gap: 0;
        transform: translateX(${translationMobile});
      }
    `
  }}
`

const CarouselCell = styled.div`
  ${({ theme }) => `
    width: 70vw;
    min-width: 70vw;
    min-height: 100%;
    background: ${theme.palette.colorBackgroundDisabled};
    @media (max-width: 768px) {
      width: 100%;
      min-width: 100%;
      &:first-child,
      &:last-child {
        display: none
      }
    }
  `}
`

const Navigator = styled(ContainerFlexRow)`
  ${({ theme }) => `
    justify-content: right;
    button {
      padding: ${theme.divSpacingSmall};
    }
  `}
`

export const Carousel: FC<Props> = ({ cards }) => {
  const [activeCard, setActiveCard] = useState(0)
  const prevCard = (): void => {
    setActiveCard(activeCard === 0 ? cards.length - 1 : activeCard - 1)
  }
  const nextCard = (): void => {
    setActiveCard(activeCard === cards.length - 1 ? 0 : activeCard + 1)
  }
  return (
    <ContainerFlexCol>
      <CarouselScroller activeCard={activeCard}>
        <CarouselCell />
        {cards.map((card, idx) => (
          <CarouselCell key={idx}>
            <CarouselItem {...card} isActive={idx === activeCard} />
          </CarouselCell>
        ))}
        <CarouselCell />
      </CarouselScroller>
      <Navigator>
        <GrayIconButton
          iconClass="fa-arrow-left fa-2x"
          onClickCallback={prevCard}
          ariaLabel={strings.ui.previous}
        />
        <GrayIconButton
          iconClass="fa-arrow-right fa-2x"
          onClickCallback={nextCard}
          ariaLabel={strings.ui.next}
        />
      </Navigator>
    </ContainerFlexCol>
  )
}
