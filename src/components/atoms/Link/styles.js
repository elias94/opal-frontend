import styled from 'styled-components'

export const Link = styled.a`
  font-weight: 600;
  
  text-decoration: none;
  color: ${props => props.theme.colors.blueGray['700']};
`

export const ExternalIcon = styled.span`
  font-size: 12px;

  display: inline-block;
  vertical-align: top;
  margin-top: -3px;
  padding-left: 3px;

  color: ${props => props.theme.colors.blueGray['400']};
`
