import styled from 'styled-components'

import Link from 'components/atoms/Link'

export const Container = styled.div`
  width: 28rem;
  position: relative;

  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.boxShadow.card};
  padding: ${props => props.theme.spacing['12']};
  border-radius: ${props => props.theme.borderRadius.lg};

  font-family: ${props => props.theme.fontFamily.sans};
  color: ${props => props.theme.colors.blueGray['900']};
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1em;
`

export const LinkEl = styled(Link)`
  font-weight: 700;
  color: ${props => props.theme.colors.blueGray['900']};
`
