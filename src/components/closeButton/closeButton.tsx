import React from "react"
import { VFC } from "react"
import styled from "styled-components"
import { CleanButton } from "../ui/index"

const CloseButtonIcon = styled.i`
    text-align: right;
`

type Props = {
    onClickCallback: () => void
}

export const CloseButton: VFC<Props> = ({ onClickCallback }) => (
    <CleanButton onClick={ onClickCallback }>
        <CloseButtonIcon className="fa fa-times fa-2x close-button" />
    </CleanButton>
)
