import styled from 'styled-components'

import IconButton from 'components/atoms/IconButton'
import SVG from 'components/atoms/SVG'

export const Container = styled.div`
  width: 100%;
  height: 47px;
  z-index: 10;

  position: sticky;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.colors.blueGray['200']};
  opacity: .95;
`

export const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-left: 1rem;
`

export const RightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin-right: 1rem;
`

export const NavbarArrow = styled(IconButton)`
  color: ${props => props.theme.colors.blueGray['400']};

  font-size: 1rem;
  padding-right: 0.5rem;
  margin: 0;

  transition: color .15s ease, background .15s ease;

  &:hover {
    color: ${props => props.theme.colors.blueGray['600']};
    background: none;
  }
`

export const NavbarIcon = styled(IconButton)`
  color: ${props => props.theme.colors.blueGray['400']};

  font-size: 1rem;
  padding: 0.5rem;
  margin: 0 0.5rem;

  transition: color .15s ease, background .15s ease;

  &:hover {
    color: ${props => props.theme.colors.blueGray['600']};
    background: none;
  }
`

export const SVGIcon = styled(SVG)`
  & > svg {
    fill: ${props => props.theme.colors.blueGray['400']};
  }

  padding: 0;
  height: 20px;
`

export const HighlightIconContainer = styled.div`
  color: ${props => props.theme.colors.blueGray['600']};

  font-size: 1.15rem;
  padding: 0.5rem 0.5rem;
  margin: 0 0.5rem;

  transition: color .15s ease, background .15s ease;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: none;

    ${SVGIcon} {
      & > svg {
        fill: ${props => props.theme.colors.blueGray['600']};
      }
    }
  }
`
