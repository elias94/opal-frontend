import styled from 'styled-components'

export const GoToLink = styled.div`
  text-align: center;
  font-size: ${props => props.theme.fontSize['xs'][0]};
  line-height: ${props => props.theme.fontSize['xs'][1].lineHeight};
  color: transparent;

  transition: color .2s ease-in-out;

  cursor: pointer;
`

export const Container = styled.div`
  border-radius: 6px;
  /* border: 1px solid ${props => props.theme.colors.gray[200]};
  box-shadow: ${props => props.theme.boxShadow['card']}; */

  background: ${props => props.theme.colors.gray[100]};
  opacity: .75;

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['base'][0]};
  line-height: ${props => props.theme.fontSize['base'][1].lineHeight};
  color: ${props => props.theme.colors.text};

  padding: 20px;
  padding-bottom: 10px;

  &:hover {
    ${GoToLink} {
      color: ${props => props.theme.colors.gray[400]};
    }
  }
`
