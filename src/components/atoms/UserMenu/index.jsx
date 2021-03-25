import { useRouter } from 'next/router'

import "@reach/menu-button/styles.css"

import {
  MenuStyled, MenuListStyled, MenuButtonStyled,
  MenuItemStyled,
} from './styles'

function UserMenu(props) {
  const router = useRouter()

  return (
    <MenuStyled>
      <MenuButtonStyled {...props}>
        {props.children}
      </MenuButtonStyled>
      <MenuListStyled>
        <MenuItemStyled onSelect={onLogoutClick}>
          Logout
        </MenuItemStyled>
      </MenuListStyled>
    </MenuStyled>
  )

  function onLogoutClick() {
    localStorage.removeItem('access_token')
    router.push('/')
  }
}

export default UserMenu
