import styled, { css } from 'styled-components'

export const Content = styled.div`
  display: inline-block;
  cursor: pointer;

  svg {
    height: 22px;
    fill: ${props => props.theme.colors.blue['500']};
  }
`
