import styled from 'styled-components'

export const Container = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  background: ${props => props.theme.colors.blueGray['50']};
`
