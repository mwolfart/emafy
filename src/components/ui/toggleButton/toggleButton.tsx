import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'
import { GlobalProps } from 'types/props'

type WrapperProps = {
  isOnOff?: boolean
  labelLeft?: string
  labelRight?: string
} & GlobalProps

type Props = {
  toggleState: boolean
  onChangeCallback: (value: boolean) => void
} & WrapperProps

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    font-family: ${(props: WrapperProps) => props.theme?.fontStyle};
    font-weight: 400;
    font-size: ${(props: WrapperProps) => props.theme?.fontSizeParagraph};
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
      background-color: ${(props: WrapperProps) =>
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
      background-color: ${(props: WrapperProps) => props.theme?.colorPrimary};
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

export const ToggleButton: FC<Props> = ({
  toggleState,
  onChangeCallback,
  isOnOff,
  labelLeft,
  labelRight,
}) => {
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChangeCallback(event.currentTarget.checked)
  }

  return (
    <Wrapper isOnOff={isOnOff}>
      {labelLeft ? <div>{labelLeft}</div> : ''}
      <label>
        <input
          className="switch"
          type="checkbox"
          onChange={onChange}
          defaultChecked={toggleState}
        />
        <div className="background" />
      </label>
      {labelRight ? <div>{labelRight}</div> : ''}
    </Wrapper>
  )
}
