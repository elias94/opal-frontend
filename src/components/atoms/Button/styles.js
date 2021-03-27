import styled from 'styled-components'

export const Button = styled.button`
  background-color: ${props => props.theme.colors.blueGray['800']};
  color: ${props => props.theme.colors.white};
  padding: 10px;
  
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 500;

  border-radius: 6px;
  border: none;
  margin-top: 2rem;
  margin-bottom: 2em;

  &:focus, &:active {
    outline: none;
  }

  cursor: pointer;
`

export const ButtonLite = styled(Button)`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.blueGray['500']};

  font-size: 0.9rem;
  line-height: 1rem;
  font-weight: 400;
  padding: 8px;

  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.trueGray['100']};
  }
`
