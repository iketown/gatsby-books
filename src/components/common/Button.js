import styled from "styled-components"

export const Button = styled.button`
  padding: 8px 16px;
  background: rebeccapurple;
  color: white;
  border-radius: 4px;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    background: indigo;
  }
  ${p => (p.block ? `display: block; width: 100%;` : "")}
`
