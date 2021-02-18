import styled from 'styled-components'

export type Props = {
  large?: boolean
}

export const ModalRectangle = styled.div`
  height: ${({ large }: Props) => (large ? '500px' : '250px')};
  width: ${({ large }: Props) => (large ? '800px' : '400px')};
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colorBackground};
  border-radius: 16px;
  border-width: 0px;
  box-shadow: 0px 80px 100px;
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 48px;
  color: ${(props) => props.theme.colorTextParagraph};
  text-align: center;
  font-family: ${(props) => props.theme.fontStyle};
  font-weight: 400;
  font-size: ${(props) => props.theme.fontSizeParagraph};
  line-height: 28px;

  p {
    padding-bottom: 12px;
  }

  & .title {
    font-size: ${(props) => props.theme.fontSizeTitle};
    color: ${(props) => props.theme.colorTextTitle};
    line-height: 40px;
    font-weight: 600;
  }
`
