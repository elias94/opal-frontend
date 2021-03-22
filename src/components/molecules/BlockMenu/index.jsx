import {
  Container, Icon,
} from './styles'

function BlockMenu({ block, visible, ...props }) {
  return (
    <Container visible={visible}>
      {!props.noAdd && (
        <Icon
          icon={['far', 'plus-square']}
          onClick={onQuoteBlockClick}
        />
      )}
    </Container>
  )

  function onQuoteBlockClick() {
    if (typeof props.onQuoteBlockClick === 'function') {
      props.onQuoteBlockClick(block)
    }
  }
}

export default BlockMenu
