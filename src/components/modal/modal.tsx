import React, { FC } from 'react'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.min.css'
import { CloseButton } from '../closeButton/closeButton'

type ModalProperties = {
    closeModalCallback?: () => void
    large?: boolean
}

const ModalRectangle = styled.div`
    height: ${ (props: ModalProperties) => props.large ? "500px" : "250px" };
    width: ${ (props: ModalProperties) => props.large ? "800px" : "400px" };
    display: flex;
    flex-direction: column;
    background-color: #F2F2F2;
    border-radius: 16px;
    border-width: 0px;
    box-shadow: 0px 80px 100px;
    padding-top: 32px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 48px;
    color: #757575;
    text-align: center;
    font-family: Montserrat, "Trebuchet MS", Arial, sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;

    p {
        padding-bottom: 12px;
    }

    & .title {
        font-size: 24px;
        color: #222222;
        line-height: 40px;
        font-weight: 600;
    }
`

export const Modal: FC<ModalProperties> = ({ children, closeModalCallback, large }) => {
    return (
        <ModalRectangle large={large}>
            <CloseButton onClickCallback={closeModalCallback || (() => 0)}/>
            { children }
        </ModalRectangle>
    )
}