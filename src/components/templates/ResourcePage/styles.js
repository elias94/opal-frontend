import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100% - 47px);
`

export const ContainerContent = styled.div`
  position: relative;
  flex: 1;
  overflow: auto;
`
