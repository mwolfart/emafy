import styled from 'styled-components'

export type Props = {
  large?: boolean
}

export const ModalRectangle = styled.div`
  height: ${({ large }: Props) => (large ? '500px' : '250px')};
  width: ${({ large }: Props) => (large ? '800px' : '400px')};
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 16px;
  border-width: 0px;
  box-shadow: 0px 80px 100px;
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 48px;
  color: #757575;
  text-align: center;
  font-family: Montserrat, 'Trebuchet MS', Arial, sans-serif;
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
