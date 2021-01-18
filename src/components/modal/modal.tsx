import React, { FC } from 'react'
import styled from 'styled-components'
import 'font-awesome/css/font-awesome.min.css'

type ModalProperties = {
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
    box-shadow: 0px 80px 100px rgba(0, 0, 0, 0.5);
    padding: 32px 32px 48px 32px;
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

    & .close-button {
        text-align: right;
    }
`

export const Modal: FC = ({ children }) =>
    <ModalRectangle>
        <i className="fa fa-times fa-2x close-button"></i>
        { children }
    </ModalRectangle>

export const ModalLarge: FC = ({ children }) =>
    <ModalRectangle large>
        <i className="fa fa-times fa-2x close-button"></i>
        { children }
    </ModalRectangle>