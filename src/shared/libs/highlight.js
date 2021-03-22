export function generateNewHighlight(highlightId, resourceId, userId, blockId, content) {
  const newHighlight = {
    id: highlightId,
    resource_id: resourceId,
    user_id: userId,
    block_id: blockId,
    content,
  }

  return newHighlight
}
