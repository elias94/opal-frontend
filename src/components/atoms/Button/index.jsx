import { forwardRef } from 'react'

import { Button, ButtonLite } from './styles'

function ButtonComponent(props, ref) {
  if (props.secondary) {
    return (
      <ButtonLite ref={ref} {...props}>
        {props.children}
      </ButtonLite>
    )
  }

  return (
    <Button ref={ref} {...props}>
      {props.children}
    </Button>
  )
}

export default forwardRef(ButtonComponent)
