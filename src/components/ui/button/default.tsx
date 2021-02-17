import styled from 'styled-components'

export const Button = styled.button`
  background-image: linear-gradient(
    45deg,
    var(--color-primary),
    var(--color-button-intermed) 66%,
    var(--color-secondary)
  );
  border-radius: 12px;
  border-width: 0px;
  padding: 0px 36px;
  color: var(--color-text-button);
  text-align: center;
  font-family: var(--font-style);
  font-size: var(--font-size-paragraph);
  font-weight: bold;
  line-height: 48px;
  letter-spacing: 1.5px;
  width: fit-content;
  align-self: center;
`
