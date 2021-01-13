import React, { FC } from 'react'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.min.css'

export const Modal = styled.button`
    min-height: 500px;
    min-width: 800px;
    background-color: #F2F2F2;
    border-radius: 16px;
    border-width: 0px;
    box-shadow: 0px 80px 100px rgba(0, 0, 0, 0.5);
    padding: 32px;
    color: #757575;
    text-align: center;
    font-family: Montserrat, Arial, sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;

    & .title {
        font-size: 24px;
        color: #222222;
        line-height: 40px;
        font-weight: 600;
    }

    & .closeButton {
        text-align: right;
    }
`

export const ModalComponent: FC = ({ children }) => {
    return (
        <div>
            <Modal>
                <i className="fa fa-times"></i>
                TEST
                { children }
            </Modal>
        </div>
    )
}