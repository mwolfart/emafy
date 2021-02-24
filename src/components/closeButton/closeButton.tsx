import { VFC } from 'react'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.min.css'
import { CleanButton } from 'components/ui/'
import { strings } from 'strings'

const CloseButtonIcon = styled.i`
  text-align: right;
`

type Props = {
  onClickCallback: () => void
}

export const CloseButton: VFC<Props> = ({ onClickCallback }) => (
  <CleanButton
    onClick={onClickCallback}
    aria-label={strings.scenes.login.instructions}
  >
    <CloseButtonIcon className="fa fa-times fa-2x close-button" />
  </CleanButton>
)
