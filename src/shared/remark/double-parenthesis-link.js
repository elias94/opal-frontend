import visit from 'unist-util-visit'

const ARTICLE_ID_R = /(\(){2}(\b[0-9a-zA-Z]{12})(\)){2}/g

const BLOCK_UUID_R = /^(\(){2}(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)(\)){2}(\s){0,2}$/g

/**
 * At the moment only support ((ARTICLE_ID))
 */
const idToURL = (id) => `/r/${id}`

function doubleParenthesisLink(tree) {
  visit(tree, 'text', (node, index, parent) => {
    const { value } = node

    const matches = value.match(ARTICLE_ID_R)

    if (!matches) {
      return
    }

    const children = [value]

    matches.forEach((match) => {
      const last = children.pop()

      if (typeof last !== 'string') {
        return
      }

      const trimmed = match.slice(2).slice(0, -2)
      const split = `((${trimmed}))`
      const [first, ...rest] = last.split(split)

      children.push(first, { id: trimmed }, rest.join(split))
    })

    parent.children.splice(
      index,
      1,
      ...children.map((child) => {
        if (typeof child === 'string') {
          return {
            type: 'text',
            value: child
          }
        }

        return {
          type: 'internal_link',
          url: idToURL(child.id),
          title: `Article_${child.id}`,
          children: [{ type: 'text', value: child.id }]
        }
      })
    )
  })
}

export default doubleParenthesisLink
