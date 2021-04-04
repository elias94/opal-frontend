import { v4 as uuidv4 } from 'uuid'

export function generateNewBlock(previous, article_id, content={}) {
  let newBlock
  let newContent = content
  let newProperties = {}
  
  if (!previous) {
    // DEFAULT
    newBlock = {
      id: uuidv4(),
      type: 'paragraph',
      position: 0,
      indent: 0,
      article_id: article_id,
      list: null,
      properties: newProperties,
      content,
    }
  } else {
    if (previous.list === 'b') {
      newProperties = { raw: '- ' }
    } else if (previous.list === 'o') {
      newProperties = { raw: `${parseInt(previous.properties.raw.trim()[0], 10) + 1}. ` }
    }

    // PREVIOUS
    newBlock = {
      id: uuidv4(),
      type: 'paragraph',
      position: previous.position + 1,
      indent: previous.indent,
      article_id: previous.article_id,
      list: previous.list,
      properties: newProperties,
      content,
    }
  }

  return newBlock
}

export function generateInternalQuoteBlock(sourceBlock, blocks, articleId) {
  const newBlock = {
    id: uuidv4(),
    type: 'internal_block',
    position: blocks.length,
    indent: 0,
    article_id: articleId,
    list: null,
    properties: {
      ...sourceBlock.properties,
      raw: `((${sourceBlock.id}))`,
      ref: {
        block_id: sourceBlock.id
      },
    },
    content: '',
  }

  return newBlock
}

export function generateInternalHighlight(highlight, blocks, articleId) {
  const { highlightId, blockId, content, raw } = highlight

  const newBlock = {
    id: uuidv4(),
    type: 'internal_highlight',
    position: blocks.length,
    indent: 0,
    article_id: articleId,
    list: null,
    properties: {
      raw,
      ref: {
        highlight_id: highlightId,
        block_id: blockId,
      },
    },
    content: content,
  }

  return newBlock
}
