import styled from 'styled-components'

export const ToastElement = styled.div`
  position: absolute;
  bottom: 17.5px;
  left: 17.5px;
  min-width: 15rem;

  padding: 17.5px 30px;
  border-radius: 6px;

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};

  font-weight: 500;

  background: ${props => props.theme.colors.blueGray['800']};
  color: ${props => props.theme.colors.white};
`
