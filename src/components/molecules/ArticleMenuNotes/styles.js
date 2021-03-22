import styled from 'styled-components'

export const Container = styled.div`
  background: ${props => props.theme.colors.blueGray['200']};
  border-radius: 6px;

  padding: 20px;
`

export const NoteContainer = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`

export const NoteHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const NoteTitle = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};
  color: ${props => props.theme.colors.blueGray['800']};

  font-weight: 600;
  letter-spacing: -.025em;

  display: inline-block;
  cursor: pointer;
`

export const NoteAuthor = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};
  color: ${props => props.theme.colors.blueGray['500']};

  display: inline-block;
  margin-left: 7.5px;
`

export const NoteDate = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['xs'][0]};
  line-height: ${props => props.theme.fontSize['xs'][1].lineHeight};
  color: ${props => props.theme.colors.blueGray['400']};

  display: inline-block;
  margin-left: 7.5px;
`

export const NotePreview = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};
  color: ${props => props.theme.colors.blueGray['600']};
`

export const EmptyList = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};
  color: ${props => props.theme.colors.blueGray['400']};

  user-select: none;
  text-align: center;
`
