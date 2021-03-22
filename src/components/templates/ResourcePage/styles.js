import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  height: ${props => props.withNav ? 'calc(100% - 47px)' : '100%'};
`
