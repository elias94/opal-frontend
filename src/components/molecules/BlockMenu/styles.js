import styled, { css } from 'styled-components'

import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
} from '@reach/menu-button'

import IconButton from 'components/atoms/IconButton'

export const EmptyMenu = styled.div`
  width: 22px;
`

export const MenuStyled = styled(Menu)`
  z-index: 6;
`

export const IconOpen = styled(IconButton)`
  color: ${props => props.theme.colors.blueGray['300']};
  font-size: 15px;
  padding: 0 7px;

  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const MenuButtonStyled = styled(MenuButton)`
  display: inline-block;
  border-radius: 6px;
  margin-top: 0.575em;
  margin-right: .1rem;

  height: min-content;

  transition: opacity .2s ease-in-out;

  outline: none;
  &:focus, &:active {
    outline: none;
  }

  &:hover {
    background: ${props => props.theme.colors.coolGray['100']};

    ${IconOpen} {
      color: ${props => props.theme.colors.blueGray['400']};
    }
  }

  &[aria-expanded="true"] {
    opacity: 1;
    background: ${props => props.theme.colors.coolGray['100']};

    ${IconOpen} {
      color: ${props => props.theme.colors.blueGray['400']};
    }
  }

  cursor: pointer;
`

export const MenuListStyled = styled(MenuList)`
  position: relative;
  z-index: 5;
  border: 1px solid ${props => props.theme.colors.blueGray['100']};
  border-radius: 6px;


  min-width: 120px;
  padding: 7.5px 0;

  box-shadow: ${props => props.theme.boxShadow['card']};
  outline: none;
  background: ${props => props.theme.colors.white};
`

export const Icon = styled(IconButton)`
  display: inline;
  height: 28px;
  color: ${props => props.theme.colors.blueGray['400']};
  font-size: 14px;
  border-radius: 6px;
  padding: 0;
  padding-top: .75rem;

  padding-right: 7.5px;

  &:hover {
    background: none;
  }

  user-select: none;
`

export const MenuItemStyled = styled(MenuItem)`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};
  color: ${props => props.theme.colors.blueGray['400']};

  padding: 5px 20px;

  cursor: pointer;
  user-select: none;

  &:hover {
    color: ${props => props.theme.colors.blueGray['500']};
    background: ${props => props.theme.colors.coolGray['100']};

    ${Icon} {
      color: ${props => props.theme.colors.blueGray['500']};
    }
  }
`
