import rehype from 'rehype'
import toMdast from 'hast-util-to-mdast'
import mdastToString from 'mdast-util-to-string'

export function extractContentFromNode(node) {
  const htmlString = node.outerHTML
  const hast = rehype.parse(htmlString)

  return toMdast(hast)
}

export function extractStringFromMdast(tree) {
  return mdastToString(tree)
}
