import { generateNewBlock } from 'shared/libs/block'

/**
 * USAGE NOTES:
 * Calling multiple state updates into the same render can cause strange behaviour,
 * this because react update state only one time at the end of the current render.
 * In case you need to perform multiple updates, is better to add a function
 * or use directly the INIT action.
 */
export function blocksReducer(state, action) {
  switch (action.type) {
    case 'APPEND':
      return appendblock(state, action)
    case 'ADD_NEW':
      return addNewBlock(state, action)
    case 'ADD_AFTER':
      return addAfterBlock(state, action)
    case 'UPDATE':
      return updateBlock(state, action)
    case 'DELETE':
      return deleteBlock(state, action)
    case 'UPDATE_ADD':
      return updateAndAddBlock(state, action)
    case 'INIT':
      return {
        blocks: action.payload,
        lastAction: action,
      }
    default:
      throw new Error('Invalid action for blocks reducer')
  }

  function appendblock({ blocks }, action) {
    const block = action.payload
    const newBlock = generateNewBlock(block)

    return {
      blocks: [...blocks, block, newBlock],
      params: { block, newBlock },
      lastAction: action,
    }
  }

  function addNewBlock({ blocks }, action) {
    const previous = action.payload

    let newBlock

    if (!previous) {
      // Generate new default block
      const { id } = action.extra
      newBlock = generateNewBlock(null, id)
    } else {
      // Generate new block based of previous one
      newBlock = generateNewBlock(previous)
    }
    
    const { position } = newBlock

    const before = blocks.slice(0, position)
    const after = blocks.slice(position).map(blk => ({
      ...blk,
      position: blk.position + 1,
    }))

    return {
      blocks: [...before, newBlock, ...after],
      params: { block: newBlock },
      lastAction: action,
    }
  }

  function addAfterBlock({ blocks }, action) {
    const { previous, newBlock } = action.payload
    const { position } = previous

    const before = blocks.slice(0, position)
    const after = blocks.slice(position + 1).map(blk => ({
      ...blk,
      position: blk.position + 1,
    }))

    return {
      blocks: [...before, previous, newBlock, ...after],
      params: { block: newBlock },
      lastAction: action,
    }
  }

  function updateBlock({ blocks }, action) {
    const block = action.payload
    const { position } = block

    const before = blocks.slice(0, position)
    const after = blocks.slice(position + 1)

    return {
      blocks: [...before, block, ...after],
      params: { block },
      lastAction: action,
    }
  }

  function updateAndAddBlock({ blocks }, action) {
    let prevBlock, nextBlock

    if (Array.isArray(action.payload)) {
      // Next block already created
      [prevBlock, nextBlock] = action.payload
    } else {
      // Create a new empty block
      prevBlock = action.payload
      nextBlock = generateNewBlock(prevBlock)
    }

    const { position } = prevBlock

    const before = blocks.slice(0, position)
    const after = blocks.slice(position + 1).map(blk => ({
      ...blk,
      position: blk.position + 1,
    }))

    return {
      blocks: [...before, prevBlock, nextBlock, ...after],
      params: { updated: prevBlock, newBlock: nextBlock },
      lastAction: action,
    }
  }

  function deleteBlock({ blocks }, action) {
    const block = action.payload
    const { position } = block

    if (position === 0 && blocks.length === 1) {
      // If last block, impossible to delete
      return blocks
    }

    const before = blocks.slice(0, position)
    const after = blocks.slice(position + 1).map(blk => ({
      ...blk,
      position: blk.position - 1,
    }))

    return {
      blocks: [...before, ...after],
      params: { block },
      lastAction: action,
    }
  }
}
