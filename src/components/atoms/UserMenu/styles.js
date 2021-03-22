import styled from 'styled-components'

import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuPopover,
  MenuLink
} from "@reach/menu-button"

export const MenuStyled = styled(Menu)``

export const MenuButtonStyled = styled(MenuButton)`
  display: flex;
  justify-content: center;
  align-items: center;

  background: none;
  border: none;

  height: 100%;
  padding: 0 20px;

  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colors.gray['100']};
  }
`

export const MenuListStyled = styled(MenuList)`
  border: 1px solid ${props => props.theme.colors.gray['200']};

  min-width: 120px;
  padding: 10px 0;

  box-shadow: ${props => props.theme.boxShadow['card']};

  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`

export const MenuItemStyled = styled(MenuItem)`
  font-family: ${props => props.theme.fontFamily.sans};
  font-size: ${props => props.theme.fontSize['sm'][0]};
  line-height: ${props => props.theme.fontSize['sm'][1].lineHeight};
  color: ${props => props.theme.colors.gray['700']};

  padding: 10px 20px;

  &:hover {
    color: ${props => props.theme.colors.gray['700']};
    background: ${props => props.theme.colors.gray['100']};
  }
`
