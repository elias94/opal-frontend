import visit from 'unist-util-visit'

const HIGHLIGHT_TEXT_R = /(\^){2}.*(\^){2}/g

function highlightText(tree) {
  visit(tree, 'text', (node, index, parent) => {
    const { value } = node

    const matches = value.match(HIGHLIGHT_TEXT_R)

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
      const split = `^^${trimmed}^^`
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
          type: 'highlight',
          title: `HighlightText_${child.id}`,
          children: [{ type: 'text', value: child.id }]
        }
      })
    )
  })
}

export default highlightText
