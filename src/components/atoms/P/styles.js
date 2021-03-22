import styled from 'styled-components'

export const ParagraphElement = styled.p`
  font-size: ${props => props.fontSize ? props.theme.fontSize[props.fontSize][0] : '1rem'};
  line-height: ${props => props.lineHeight ? props.theme.fontSize[props.lineHeight][1].lineHeight : '1.5rem'};

  text-align: ${props => props.center ? 'center' : 'left'};
`
