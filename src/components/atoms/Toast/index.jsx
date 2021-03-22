import Portal from '@reach/portal'

import {
  ToastElement,
} from './styles'

function Toast({ toast }) {
  if (!toast) {
    return null
  }

  return (
    <Portal>
      <ToastElement>
        {toast}
      </ToastElement>
    </Portal>
  )
}

export default Toast
