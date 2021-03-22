import { useEffect } from 'react'
import { fetchBlock } from 'store'

import { formatContent } from 'components/molecules/Block'

import {
  Container
} from './styles'

function InternalBlock({ blockId }) {
  const { block, loading, mutate, error } = fetchBlock(blockId)

  useEffect(() => {
    mutate()
  }, [blockId])

  if (loading) {
    return (
      <Container>loading...</Container>
    )
  }

  if (error) {
    return (
      <Container>Error retrieving block: {blockId}</Container>
    )
  }

  return (
    <Container>
      {formatContent(block.content, { blockId })}
    </Container>
  )
}

export default InternalBlock
