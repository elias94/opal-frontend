import { forwardRef } from 'react'

import { IconContainer, IconEl } from './styles'

function IconButton({ icon, ...props }, ref) {
  return (
    <IconContainer ref={ref} {...props}>
      <IconEl icon={icon} />
    </IconContainer>
  )
}

export default forwardRef(IconButton)
