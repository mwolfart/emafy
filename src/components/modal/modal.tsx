import { FC } from 'react'
import { ModalRectangle, ModalRectProps } from 'components/ui/'
import { IconButton } from 'components/ui'
import { strings } from 'strings'

type Props = {
  closeModalCallback: () => void
} & ModalRectProps

export const Modal: FC<Props> = ({ children, closeModalCallback, large }) => (
  <ModalRectangle large={large}>
    <IconButton
      iconClass="fa-times"
      ariaLabel={strings.components.modal.closeModal}
      onClickCallback={closeModalCallback}
    />
    {children}
  </ModalRectangle>
)
