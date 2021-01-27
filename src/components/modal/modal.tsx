import React, { FC } from 'react'
import { CloseButton } from '../closeButton/closeButton'
import { ModalRectangle, Props as ModalRectProps } from '../ui/modalRectangle'

type Props = {
  closeModalCallback: () => void
} & ModalRectProps

export const Modal: FC<Props> = ({ children, closeModalCallback, large }) =>
  <ModalRectangle large={large}>
    <CloseButton onClickCallback={closeModalCallback} />
    {children}
  </ModalRectangle>