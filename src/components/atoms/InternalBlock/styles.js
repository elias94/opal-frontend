import styled from 'styled-components'

export const Container = styled.div`
  border-radius: 6px;
  border: 1px solid ${props => props.theme.colors.gray[200]};
  box-shadow: ${props => props.theme.boxShadow['card']};

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['base'][0]};
  line-height: ${props => props.theme.fontSize['base'][1].lineHeight};

  padding: 20px;
`
