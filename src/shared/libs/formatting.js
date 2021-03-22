import { decodeHtmlCharCodes } from 'shared/utils'

import InternalLink from 'components/atoms/InternalLink'

export function formatContentFlat(children) {
  if (!Array.isArray(children)) {
    return renderTokenFlat(children)
  }

  return children.map((node) => {
    return renderTokenFlat(node)
  })
}

function renderTokenFlat(node) {
  const { type, children, value } = node

  let render

  if (type === 'paragraph') {
    render = formatContentFlat(children)
  }
  else if (type === 'link') {
    render = formatContentFlat(children)
  }
  else if (type === 'internal_link') {
    render = `((${formatContentFlat(children)}))`//<InternalLink key={`InternalLink_${node.url}`} node={node} />
  }
  else if (type === 'strong') {
    render = formatContentFlat(children)
  }
  else if (type === 'emphasis') {
    render = formatContentFlat(children)
  }
  else if (type === 'delete') {
    render = formatContentFlat(children)
  }
  else if (type === 'inlineMath') {
    render = ''
  }
  else if (type === 'inlineCode') {
    render = ''
  }
  else if (type === 'image') {
    render = ''
  }
  else if (type === 'text') {
    render = decodeHtmlCharCodes(value)
  }

  return render
}
