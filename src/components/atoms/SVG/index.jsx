import { forwardRef } from 'react'

import { Container } from './styles'

function SVG({ children, ...props }, ref) {
  return (
    <Container ref={ref} {...props} dangerouslySetInnerHTML={{__html: children[0]}} />
  )
}

export default forwardRef(SVG)

export function svgImport(svgElement) {
  // Trim initial whitespaces
  return [svgElement[0].trim()]
}
