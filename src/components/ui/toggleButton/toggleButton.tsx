import { FC } from 'react'
import styled from 'styled-components'
import { GlobalProps } from 'types/props'

type Props = {
  isOnOff?: boolean
  labelLeft?: string
  labelRight?: string
} & GlobalProps

const Wrapper = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    font-family: ${(props: Props) => props.theme?.fontStyle};
    font-weight: 400;
    font-size: ${(props: Props) => props.theme?.fontSizeParagraph};
    height: 100%;
    padding: 0 10px;
  }

  label {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;

    .background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 30px;
      border-width: 0;
      background-color: ${(props: Props) =>
        props.isOnOff
          ? props.theme?.colorDarkerBackground
          : props.theme?.colorSecondary};
      transition: 0.3s ease;
    }

    .background:before {
      position: absolute;
      content: '';
      width: 26px;
      height: 26px;
      top: 4px;
      left: 4px;
      border-radius: 13px;
      border-width: 0;
      background-color: #fff;
      transition: 0.3s ease;
    }

    input:checked + .background {
      background-color: ${(props: Props) => props.theme?.colorPrimary};
      transition: 0.3s ease;
    }

    input:checked + .background:before {
      transition: 0.3 ease;
      transform: translateX(26px);
    }

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }
`

export const ToggleButton: FC<Props> = ({ isOnOff, labelLeft, labelRight }) => (
  <Wrapper isOnOff={isOnOff}>
    {labelLeft ? <div>{labelLeft}</div> : ''}
    <label>
      <input className="switch" type="checkbox" />
      <div className="background" />
    </label>
    {labelRight ? <div>{labelRight}</div> : ''}
  </Wrapper>
)
