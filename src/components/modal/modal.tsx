import { FC } from 'react'
import { ModalRectangle, ModalRectProps } from 'components/ui/'
import { GrayIconButton } from 'components/ui'
import { strings } from 'strings'

type Props = {
  closeModalCallback: () => void
} & ModalRectProps

export const Modal: FC<Props> = ({ children, closeModalCallback, large }) => (
  <ModalRectangle large={large}>
    <GrayIconButton
      iconClass="fa-times"
      ariaLabel={strings.components.modal.closeModal}
      onClickCallback={closeModalCallback}
    />
    {children}
  </ModalRectangle>
)
