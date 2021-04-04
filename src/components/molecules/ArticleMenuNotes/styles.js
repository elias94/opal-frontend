import styled from 'styled-components'

import IconButton from 'components/atoms/IconButton'

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

export const NoteTitleContainer = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};
  color: ${props => props.theme.colors.blueGray['800']};

  font-weight: 600;
  letter-spacing: -.025em;

  position: relative;
  flex-direction: row;
  align-items: center;

  display: inline-flex;
  cursor: pointer;
`

export const NoteTitle = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  max-width: 25rem;
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

export const NoteVotes = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['xs'][0]};
  line-height: ${props => props.theme.fontSize['xs'][1].lineHeight};
  color: ${props => props.theme.colors.blueGray['600']};
  background: ${props => props.theme.colors.blueGray['300']};
  padding: 0px 3px;
  border-radius: 4px;

  text-align: center;
  min-width: 30px;

  margin-right: 8px;
`

export const EmptyList = styled.div`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};
  color: ${props => props.theme.colors.blueGray['400']};

  user-select: none;
  text-align: center;
`

export const Caret = styled(IconButton)`
  color: ${props => props.theme.colors.blueGray['500']};
  display: inline;

  height: 17px;
  line-height: 0;
  padding: 0;

  transform: translateY(-10%);

  & > svg {
    transform: rotate(-90deg);
    height: 18px;
  }

  &:hover {
    background: none;
    color: ${props => props.theme.colors.blueGray['700']};
  }
`
