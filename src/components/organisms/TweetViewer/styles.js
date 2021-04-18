import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  flex: 1;
  overflow: auto;

  min-width: 625px;

  border-right: 1px solid ${props => props.theme.colors.articleBorderRight};
`

export const TwitterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  color: ${props => props.theme.colors.gray['400']};

  height: calc(100% - 47px);

  & > div {
    width: auto;
    min-width: 30rem;
    margin: 0 auto;
  }
`
