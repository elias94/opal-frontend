import styled, { css } from 'styled-components'

import SVG from 'components/atoms/SVG'
import Title from 'components/atoms/Title'
import Button from 'components/atoms/Button'
import IconButton from 'components/atoms/IconButton'

export const Container = styled.div`
  flex-grow: .6;
  flex-shrink: 1;
  flex-basis: 0;
  z-index: 2;

  background: ${props => props.theme.colors.warmGray['100']};
  transition: width .3s ease-in-out;

  ${props => props.hidden && css`
    flex-grow: 0;
  `}

  ${props => props.hidden && !props.isSingleArticle && css`
    width: 0;
  `}

  ${props => !props.isSingleArticle && css`
    position: absolute;
    right: 0;

    width: 45rem;
    height: calc(100% - 47px);

    box-shadow: ${props => props.theme.boxShadow['lg']};
  `}
`

export const MenuContainer = styled.div`
  padding: 1rem 1.5rem;
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
`

export const HeaderMenu = styled.div`
`

export const IconClose = styled(IconButton)`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.blueGray['400']};

  &:hover {
    color: ${props => props.theme.colors.blueGray['500']};
    background: none;
  }
`

export const HeaderTitle = styled(Title)`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['2xl'][0]};
  line-height: ${props => props.theme.fontSize['2xl'][1].lineHeight};
  color: ${props => props.theme.colors.blueGray['500']};
  font-weight: 600;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 0;
`

export const SVGClose = styled(SVG)`
  color: ${props => props.theme.colors.blueGray['400']};
  font-size: ${props => props.theme.fontSize['2xl'][0]};
  line-height: ${props => props.theme.fontSize['2xl'][1].lineHeight};

  cursor: pointer;
`

export const HeaderDetails = styled.p`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['xs'][0]};
  line-height: ${props => props.theme.fontSize['xs'][1].lineHeight};
  color: ${props => props.theme.colors.blueGray['400']};

  margin-top: 3px;

  font-style: italic;
`

export const HeaderDivider = styled.span`
  margin: 0 5px;
`

export const HeaderSeparator = styled.div`
  width: 40%;
  height: 0;
  border: 1px solid ${props => props.theme.colors.blueGray['200']};

  margin: 15px auto;

  border-radius: 6px;
`

export const SectionButton = styled(Button)`
  color: ${props => props.theme.colors.blueGray['500']};
  font-weight: 500;
  background: none;
  margin: 0;

  &:hover {
    color: ${props => props.theme.colors.blueGray['600']};
    background: ${props => props.theme.colors.blueGray['200']};
  }
`

export const Caret = styled(IconButton)`
  color: ${props => props.voted ?
    props.theme.colors.blueGray['500']
    :
    props.theme.colors.blueGray['300']
  };
  font-size: 32px;
  display: inline;

  margin-right: 10px;

  line-height: 0;
  padding: 0;

  &:hover {
    background: none;
    color: ${props => props.theme.colors.blueGray['700']};
  }
`
