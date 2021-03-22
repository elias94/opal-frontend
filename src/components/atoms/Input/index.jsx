import { forwardRef } from 'react'
import { Input } from './styles'

function InputComponent(props, ref) {
  return (
    <Input ref={ref} {...props} />
  )
}

export default forwardRef(InputComponent)
