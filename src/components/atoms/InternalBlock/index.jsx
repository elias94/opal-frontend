import { useEffect } from 'react'
import { fetchBlock } from 'store'

import { formatContent } from 'components/molecules/Block'

import {
  Container
} from './styles'

function InternalBlock({ blockId, ...props }) {
  const { block, loading, mutate, error } = fetchBlock(blockId)

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
      <Container {...props}>Error retrieving block: {blockId}</Container>
    )
  }

  return (
    <Container {...props}>
      {formatContent(block.content, { blockId })}
    </Container>
  )
}

export default InternalBlock
