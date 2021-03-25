import styled from 'styled-components'


export const Container = styled.div`
  min-width: 25rem;

  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.boxShadow.card};
  padding: ${props => props.theme.spacing['10']};
  border-radius: ${props => props.theme.borderRadius.lg};

  font-family: ${props => props.theme.fontFamily.sans};
  color: ${props => props.theme.colors.trueGray['900']};
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
`
