import React, { FC } from 'react'
import { CanvasRectangle } from '../ui/canvasRectangle'

export const Canvas: FC = ({ children }) =>
    <CanvasRectangle>
        { children }
    </CanvasRectangle>
    
