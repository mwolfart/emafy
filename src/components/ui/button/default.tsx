import styled from 'styled-components'

export const Button = styled.button`
  background-image: linear-gradient(
    45deg,
    ${(props) => props.theme.colorPrimary},
    ${(props) => props.theme.colorButtonIntermed} 66%,
    ${(props) => props.theme.colorSecondary}
  );
  border-radius: 12px;
  border-width: 0px;
  padding: 0px 36px;
  color: ${(props) => props.theme.colorTextButton};
  text-align: center;
  font-family: ${(props) => props.theme.fontStyle};
  font-size: ${(props) => props.theme.fontSizeParagraph};
  font-weight: bold;
  line-height: 48px;
  letter-spacing: 1.5px;
  width: fit-content;
  align-self: center;
`
