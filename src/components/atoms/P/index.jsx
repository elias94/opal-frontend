import { forwardRef } from 'react'

import { ParagraphElement } from './styles'

function ParagraphComponent(props, ref) {
  return (
    <ParagraphElement {...props} ref={ref}>
      {props.children}
    </ParagraphElement>
  )
}

export default forwardRef(ParagraphComponent)
