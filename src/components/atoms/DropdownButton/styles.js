import styled, { css } from 'styled-components'

import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover,
  MenuLink
} from '@reach/menu-button'

import IconButton from 'components/atoms/IconButton'

export const MenuStyled = styled(Menu)`
z-index: 6;
`

export const MenuButtonStyled = styled(MenuButton)`
  border-radius: 6px;

  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.blueGray['500']};
  border: none;

  font-size: 0.9rem;
  font-weight: 400;
  line-height: 1rem;
  padding: 8px;

  &:focus, &:active {
    outline: none;
  }

  &:hover {
    background: ${props => props.theme.colors.coolGray['100']};
  }

  &[aria-expanded="true"] {
    background: ${props => props.theme.colors.coolGray['100']};
  }

  position: relative;
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

export const MenuItemStyled = styled(MenuItem)`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};
  color: ${props => props.theme.colors.blueGray['700']};

  padding: 5px 20px;

  cursor: pointer;
  user-select: none;

  &:hover {
    color: ${props => props.theme.colors.blueGray['700']};
    background: ${props => props.theme.colors.blueGray['100']};
  }
`

export const Caret = styled(IconButton)`
  color: ${props => props.theme.colors.blueGray['400']};
  display: inline;

  height: 8px;
  font-size: 18px;
  line-height: 0;

  transform: translateY(-10%);

  & > svg {
    transform: rotate(90deg);
    height: 16px;
  }

  &:hover {
    background: none;
  }
`
