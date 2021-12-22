import { FC } from 'react'
import { ModalRectangle } from 'components/ui/'
import { GrayIconButton } from 'components/ui'
import { strings } from 'strings'

type Props = {
  closeModalCallback?: () => void
  large?: boolean
}

export const Modal: FC<Props> = ({ children, closeModalCallback, large }) => (
  <ModalRectangle large={large}>
    {closeModalCallback && (
      <GrayIconButton
        iconClass="fa-times"
        ariaLabel={strings.components.modal.closeModal}
        onClickCallback={closeModalCallback}
      />
    )}
    {children}
  </ModalRectangle>
)
