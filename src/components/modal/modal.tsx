import { FC, ReactNode } from 'react'
import { ModalRectangle } from 'components/ui/'
import { GrayIconButton } from 'components/ui'
import { strings } from 'strings'
import { useTheme } from 'styled-components'

interface Props {
  closeModalCallback?: () => void
  large?: boolean
  children: ReactNode
}

export const Modal: FC<Props> = ({ children, closeModalCallback, large }) => {
  const theme = useTheme()
  return (
    <ModalRectangle large={large}>
      {closeModalCallback && (
        <GrayIconButton
          iconClass="fa-times"
          ariaLabel={strings.components.modal.closeModal}
          onClickCallback={closeModalCallback}
          iconSize={theme.fontSizeIcon}
        />
      )}
      {children}
    </ModalRectangle>
  )
}
