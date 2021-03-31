import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Status = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};

  color: ${props => props.theme.colors.gray['400']};
`
