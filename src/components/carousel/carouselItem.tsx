import {
  SubtitleExtraLarge,
  TitleExtraLarge,
} from 'components/ui/heading/heading'
import { FC } from 'react'
import styled from 'styled-components'
import sanitizeHtml from 'sanitize-html'

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
    background-image: ${theme.palette.gradientBanner}, url(${image});
    background-size: cover;
    background-position-y: center;
    padding: ${theme.divSpacingExtraBig};
    @media (max-width: 576px) {
      padding: ${theme.divSpacingSmall} ${theme.divSpacingExtraBig};
    }
  `}
`

const EffectOverlay = styled.div<OverlayProps>`
  ${({ isActive, theme }) => `
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: ${theme.palette.gradientBannerInactive};
    background-size: cover;
    opacity: ${isActive ? '0' : '1'};
    transition: 1s;
    pointer-events: ${isActive ? 'none' : 'inherit'};
  `}
`

const Title = styled(TitleExtraLarge)`
  ${({ theme }) => `
    color: ${theme.palette.colorTextNegative};
    padding-top: ${theme.divSpacingSmall};
  `}
`

const Subtitle = styled(SubtitleExtraLarge)`
  ${({ theme }) => `
    color: ${theme.palette.colorGray300};
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
    @media (max-width: 576px) {
      margin-top: 0;
    }
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
      <Subtitle dangerouslySetInnerHTML={{ __html: sanitizeHtml(subtitle) }} />
      <CTAContainer>{cta}</CTAContainer>
    </Wrapper>
  )
}
