import { useEffect } from 'react'
import { fetchBlock } from 'store'

import { formatContent } from 'components/molecules/Block'

import {
  Container, GoToLink
} from './styles'

function InternalBlock({ blockId, openResource, ...props }) {
  const { block: blockInfo, loading, mutate, error } = fetchBlock(blockId)

  useEffect(() => {
    mutate()
  }, [blockId])

  if (loading) {
    return (
      <Container {...props}>loading...</Container>
    )
  }

  if (error) {
    return (
      <Container {...props}>Error retrieving block {blockId}</Container>
    )
  }

  return (
    <Container {...props}>
      {formatContent(blockInfo.block.content, { blockId })}
      <GoToLink onClick={openOriginalResource}>
        Go to source &#8250;
      </GoToLink>
    </Container>
  )

  function openOriginalResource() {
    openResource(blockInfo.resource_id)
  }
}

export default InternalBlock
