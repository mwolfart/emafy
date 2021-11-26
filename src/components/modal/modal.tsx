import { FC } from 'react'
import {
  ModalRectangle,
  StyledProps as ModalRectProps,
} from 'components/ui/modalRectangle'
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
