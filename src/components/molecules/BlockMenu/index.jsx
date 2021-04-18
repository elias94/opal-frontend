import Tooltip from 'components/atoms/Tooltip'

import {
  MenuStyled, MenuButtonStyled,
  IconOpen, MenuListStyled,
  MenuItemStyled, Icon,
  EmptyMenu,
} from './styles'

function BlockMenu({ block, visible, ...props }) {
  if (!visible) {
    return <EmptyMenu />
  }

  return (
    <MenuStyled>
      <Tooltip label="Open block menu">
        <MenuButtonStyled>
          <IconOpen icon="ellipsis-v" />
        </MenuButtonStyled>
      </Tooltip>
      <MenuListStyled>
        {!props.noAdd && (
          <MenuItemStyled onSelect={() => props.onQuoteBlockClick(block)}>
            <Icon icon={['far', 'plus-square']} />
            Append block to note
          </MenuItemStyled>
        )}
        {!props.noShare && (
          <MenuItemStyled onSelect={() => props.copyBlockLinkToClipboard(block.id)}>
            <Icon icon="share" />
            Copy block ID
          </MenuItemStyled>
        )}
      </MenuListStyled>
    </MenuStyled>
  )
}

export default BlockMenu
