import React, { VFC} from "react"
import styled from "styled-components"
import { CleanButton } from "../ui/"

const CloseButtonIcon = styled.i`
    text-align: right;
`

type Props = {
    onClickCallback: () => void
}

export const CloseButton: VFC<Props> = ({ onClickCallback }) => (
    <CleanButton onClick={ onClickCallback } aria-label="Close modal">
        <CloseButtonIcon className="fa fa-times fa-2x close-button" />
    </CleanButton>
)
