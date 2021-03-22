import Tooltip from 'components/atoms/Tooltip'

import "@reach/menu-button/styles.css"

import {
  MenuStyled, MenuButtonStyled, MenuListStyled, MenuItemStyled,
  Caret,
} from './styles'

function DrodpdownButton(props) {
  return (
    <MenuStyled>
      <Tooltip label={props.tooltipLabel}>
        <MenuButtonStyled>
          {props.children}
          <Caret icon="caret-right" />
        </MenuButtonStyled>
      </Tooltip>
      <MenuListStyled>
        {props.options.map(opt => (
          <MenuItemStyled
            key={`DropdownButtonOption_${opt}`}
            onSelect={() => props.onSelect(opt)}
          >
            {opt}
          </MenuItemStyled>
        ))}
      </MenuListStyled>
    </MenuStyled>
  )
}

export default DrodpdownButton
