const MARKDOWN_SIZES = {
  'strong': 2,  // **
  'em': 1,      // _
  'del': 2,     // ~~
  'code': 1,    // `
}

function getSurroundLettersCount(node) {
  const { nodeName } = node
  // check if the nodeName is a html element or is something else like math element
  if (nodeName.lower() in MARKDOWN_SIZES) {
    return MARKDOWN_SIZES[nodeName.lower()] * 2
  }
  return null
}

function getSurroundLettersCountWithNode(node) {
  const { nodeName } = node

  if (nodeName === 'A') {
    return {
      count: 4 + node.getAttribute('href').length,
      node: node,
    }
  } else if (nodeName === 'SPAN') {
    const nodeMath = node.querySelector('.math.math-inline')
  
    if (nodeMath) {
      return { count: 4, node: nodeMath } // $$
    }
  }

  return { count: 0, node }
}

/**
 * Extract the length of the content inside the node
 * in markdown format.
 * 
 * input:
 *  <div>foo <strong>bar</strong> <em>doo</em></div>
 * 
 * output:
 *  17 -> 'foo **bar** _doo_'
 */
export function extractMDLengthFromHTMLNode(nodeContainer) {
  const contentNodes = [...nodeContainer.childNodes]
  let count = 0

  let i = 0
  while (1) {
    let node = contentNodes[i]

    if (!node) {
      break
    }

    if (node.nodeType === Node.TEXT_NODE) {
      count += node.nodeValue.length
    } else {
      let surroundLettersCount = getSurroundLettersCount(node)

      if (!surroundLettersCount) {
        const info = getSurroundLettersCountWithNode(node)
        surroundLettersCount = info.count
        node = info.node  // change node to
      }

      count += (surroundLettersCount + extractMDLengthFromHTMLNode(node))
    }

    i++
  }

  return count
}
