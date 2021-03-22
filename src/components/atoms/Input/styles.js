import styled from 'styled-components'

export const Input = styled.input`
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;

  color: ${props => props.color || 'inerith'};
  border: 1px solid ${props => props.theme.colors.coolGray['300']};
  
  margin-top: 5px;
  margin-bottom: 15px;
  background-color: #FFF;
  filter: none;

  &:focus, &:active {
      outline: none;
  }
`
