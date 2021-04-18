import unified from 'unified'
import rehype from 'rehype'
import toMdast from 'hast-util-to-mdast'
import html from 'rehype-parse'
import stringify from 'remark-stringify'
import rehype2remark from 'rehype-remark'
import mdastToString from 'mdast-util-to-string'

export function extractContentFromNode(node) {
  const htmlString = node.outerHTML
  const hast = rehype.parse(htmlString)

  return toMdast(hast)
}

export function extractStringFromMdast(tree) {
  return mdastToString(tree)
}

export function extractTextFromNode(node) {
  return extractStringFromMdast(extractContentFromNode(node.outerHTML))
}

export function extractMarkdownFromRange(range) {
  const fragment = range.cloneContents()
  const div = document.createElement('div')

  div.append(...fragment.childNodes)

  const htmlString = div.outerHTML

  const text = unified()
                .use(html)
                .use(rehype2remark)
                .use(stringify)
                .processSync(htmlString).contents

  return text
}
