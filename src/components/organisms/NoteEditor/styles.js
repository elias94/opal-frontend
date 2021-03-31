import styled from 'styled-components'

import SVG from 'components/atoms/SVG'
import Title from 'components/atoms/Title'
import Button from 'components/atoms/Button'

export const Container = styled.div`
  flex: 1;
  z-index: 2;

  background: ${props => props.theme.colors.white};
  border-right: 1px solid ${props => props.theme.colors.gray['200']};

  overflow: scroll;
`

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: relative;
`

export const HeaderContainer = styled.div`
  width: 100%;
  height: 57px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: sticky;
  padding: 0 1.5rem;
  position: sticky;
  top: 0;
  left: 0;
  height: 58px;

  box-sizing: border-box;
  background: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.gray['100']};
`

export const Header = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
`

export const HeaderMenu = styled.div`
  display: flex;
  /* flex-direction: row; */
  align-items: center;
`

export const HeaderTitle = styled(Title)`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['base'][0]};
  line-height: ${props => props.theme.fontSize['base'][1].lineHeight};
  color: ${props => props.theme.colors.gray['500']};
  font-weight: 400;

  margin: 0;
  margin-right: 17.5px;

  max-width: 25vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const SVGClose = styled(SVG)`
  color: ${props => props.theme.colors.gray['400']};
  font-size: ${props => props.theme.fontSize['2xl'][0]};
  line-height: ${props => props.theme.fontSize['2xl'][1].lineHeight};

  cursor: pointer;

  &:hover {
    & > svg {
      fill: ${props => props.theme.colors.gray['600']};
    }
  }

  & > svg {
    height: 20px;
    fill: ${props => props.theme.colors.gray['400']};
  }
`

export const HeaderButton = styled(Button)`
  display: inline-flex;

  margin: 0 5px;
`

export const Editor = styled.div`
  margin-top: 10rem;

  width: 37.5rem;
`

export const NoteTitle = styled(Title)`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['5xl'][0]};
  line-height: 3.75rem;

  margin: 0;
  margin-bottom: 6rem;
  outline: none;
`

export const Content = styled.div`
  margin-bottom: 10rem;
`
