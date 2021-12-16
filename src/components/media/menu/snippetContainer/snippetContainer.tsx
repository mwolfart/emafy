import { FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { MediaExtraProps } from 'types/mediaExtraProps'

type Props = {
  rowVariant?: boolean
  extraProps?: MediaExtraProps
}

interface IProps {
  displayLeft: boolean
  displayTop: boolean
}

const FlexWrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    padding: ${theme.divSpacingSmall};
  `}
`

const AbsoluteWrapper = styled.div<IProps>`
  ${({ displayTop, displayLeft }) => `
    position: absolute;
    z-index: 1;
    width: 450px;
    ${displayTop ? 'bottom: 80px;' : 'top: 0;'}
    left: ${displayLeft ? '-480px' : '250px'};

    @media (max-width: 1100px) {
      ${displayLeft ? `right: 30px; left: unset;` : 'left: 0'};
      top: 220px;
    }
  `}
`

export const SnippetContainer: FC<Props> = ({
  rowVariant: isRowVariant,
  children,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [shouldDisplayLeft, setShouldDisplayLeft] = useState<boolean>(false)
  const [shouldDisplayTop, setShouldDisplayTop] = useState<boolean>(false)
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false)

  useEffect(() => {
    if (wrapperRef.current) {
      const snippetPositionX = wrapperRef.current?.getBoundingClientRect().x
      const snippetPositionY = wrapperRef.current?.getBoundingClientRect().y
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight
      setShouldDisplayLeft(snippetPositionX > windowWidth / 1.5)
      setShouldDisplayTop(snippetPositionY > windowHeight / 2.5)
      setIsMobileScreen(windowWidth <= 576)
    }
  }, [wrapperRef])

  return isRowVariant || isMobileScreen ? (
    <FlexWrapper>{children}</FlexWrapper>
  ) : (
    <AbsoluteWrapper
      ref={wrapperRef}
      displayLeft={shouldDisplayLeft}
      displayTop={shouldDisplayTop}
    >
      {children}
    </AbsoluteWrapper>
  )
}
