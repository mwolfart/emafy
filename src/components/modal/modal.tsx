import React, { FC } from 'react'
import 'font-awesome/css/font-awesome.min.css'
import { CloseButton } from '../closeButton/closeButton'
import { ModalRectangle, Props as ModalRectProps } from '../ui/modalRectangle'

type Props = {
    closeModalCallback: () => void
} & ModalRectProps

export const Modal: FC<Props> = ({ children, closeModalCallback, large }) => {
    return (
        <ModalRectangle large={large}>
            <CloseButton onClickCallback={closeModalCallback}/>
            { children }
        </ModalRectangle>
    )
}
