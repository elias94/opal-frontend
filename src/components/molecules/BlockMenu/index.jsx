import Tooltip from 'components/atoms/Tooltip'

import {
  Container, Icon,
} from './styles'

function BlockMenu({ block, visible, ...props }) {
  return (
    <Container visible={visible}>
      {!props.noAdd && (
        <Tooltip label="Add block to note">
          <Icon
            icon={['far', 'plus-square']}
            onClick={() => props.onQuoteBlockClick(block.id)}
          />
        </Tooltip>
      )}
      {!props.noShare && (
        <Tooltip label="Copy block link">
          <Icon
            icon="share"
            onClick={() => props.copyBlockLinkToClipboard(block.id)}
          />
        </Tooltip>
      )}
    </Container>
  )
}

export default BlockMenu
