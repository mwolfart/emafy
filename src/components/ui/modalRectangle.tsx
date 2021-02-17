import styled from 'styled-components'

export type Props = {
  large?: boolean
}

export const ModalRectangle = styled.div`
  height: ${({ large }: Props) => (large ? '500px' : '250px')};
  width: ${({ large }: Props) => (large ? '800px' : '400px')};
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  border-radius: 16px;
  border-width: 0px;
  box-shadow: 0px 80px 100px;
  padding-top: 32px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 48px;
  color: var(--color-text-paragraph);
  text-align: center;
  font-family: var(--font-style);
  font-weight: 400;
  font-size: var(--font-size-paragraph);
  line-height: 28px;

  p {
    padding-bottom: 12px;
  }

  & .title {
    font-size: var(--font-size-title);
    color: var(--color-text-title);
    line-height: 40px;
    font-weight: 600;
  }
`
