import React, { FC } from 'react'
import styled from 'styled-components'

const CanvasRectangle = styled.div`
    position: absolute;
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    background-color: #EEEEEE;
`

const InactiveCanvasRectangle = styled(CanvasRectangle)`
    background-color: #AAAAAA55;
    place-items: center;
`

export const Canvas: FC = ({ children }) =>
    <CanvasRectangle>
        { children }
    </CanvasRectangle>

export const InactiveCanvas: FC = ({ children }) =>
    <InactiveCanvasRectangle>
        { children }
    </InactiveCanvasRectangle>