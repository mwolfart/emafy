import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'
import { GlobalProps } from 'types/props'

type StyledProps = {
  isOnOff?: boolean
  labelLeft?: string
  labelRight?: string
} & GlobalProps

type Props = {
  toggleState: boolean
  onChangeCallback: (value: boolean) => void
} & StyledProps

const Wrapper = styled.div<StyledProps>`
  ${({ isOnOff, theme }: StyledProps) => `
    display: flex;
    flex-direction: row;
    align-items: center;

    div {
      font-family: ${theme?.fontStyle};
      font-weight: ${theme?.fontBoldOne};
      font-size: ${theme?.fontSizeParagraph};
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
        border-radius: ${theme?.borderRadiusLarge};
        border-width: 0;
        background-color: ${
          isOnOff
            ? theme?.palette.colorDarkerBackground
            : theme?.palette.colorSecondary
        };
        transition: ${theme?.transitionQuick};
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
        transition: ${theme?.transitionQuick};
      }

      input:checked + .background {
        background-color: ${theme?.palette.colorPrimary};
        transition: ${theme?.transitionQuick};
      }

      input:checked + .background:before {
        transition: ${theme?.transitionQuick};
        transform: translateX(26px);
      }

      input {
        opacity: 0;
        width: 0;
        height: 0;
      }
    }
  `}
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
