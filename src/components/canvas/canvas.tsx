import React, { FC } from 'react'
import styled from 'styled-components'

const CanvasRectangle = styled.div`
    position: absolute;
    min-height: 100%;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    background-color: #AAAAAA55;
    place-items: center;
`

export const Canvas: FC = ({ children }) =>
    <CanvasRectangle>
        { children }
    </CanvasRectangle>
    