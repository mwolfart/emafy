import {
  SubtitleExtraLarge,
  TitleExtraLarge,
} from 'components/ui/heading/heading'
import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  title: string
  subtitle: string
  image: string
  cta: JSX.Element
  isActive: boolean
}

interface StyledProps {
  image: string
}

interface OverlayProps {
  isActive: boolean
}

const Wrapper = styled.div<StyledProps>`
  ${({ image, theme }) => `
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    background-image: linear-gradient(
      to bottom, 
      ${theme.palette.colorBackgroundBannerEdge},
      ${theme.palette.colorBackgroundBannerCenter} 50%, 
    ${theme.palette.colorBackgroundBannerEdge}), url(${image});
    background-size: cover;
    background-position-y: center;
    padding: ${theme.divSpacingExtraBig};
  `}
`

const EffectOverlay = styled.div<OverlayProps>`
  ${({ isActive, theme }) => `
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: ${theme.palette.colorBackgroundBannerCenterInactive};
    background-size: cover;
    opacity: ${isActive ? '0' : '1'};
    transition: 1s;
    pointer-events: ${isActive ? 'none' : 'inherit'};
  `}
`

const Title = styled(TitleExtraLarge)`
  ${({ theme }) => `
    color: ${theme.palette.colorTextTitleLarge};
    padding-top: ${theme.divSpacingSmall};
  `}
`

const Subtitle = styled(SubtitleExtraLarge)`
  ${({ theme }) => `
    color: ${theme.palette.colorTextSubtitleLarge};
    padding-bottom: ${theme.divSpacingBig};
  `}
`
const CTAContainer = styled.div`
  ${({ theme }) => `
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-self: start;
    margin: ${theme.divSpacingBig} 0;
  `}
`

export const CarouselItem: FC<Props> = ({
  title,
  subtitle,
  image,
  cta,
  isActive,
}) => {
  return (
    <Wrapper image={image}>
      <EffectOverlay isActive={isActive} />
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <CTAContainer>{cta}</CTAContainer>
    </Wrapper>
  )
}
