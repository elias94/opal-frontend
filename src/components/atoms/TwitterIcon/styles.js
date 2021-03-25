import styled, { css } from 'styled-components'

export const Content = styled.span`
  display: inline-block;
  cursor: pointer;

  svg {
    height: 22px;
    fill: ${props => props.theme.colors.blue['400']};
  }
`
