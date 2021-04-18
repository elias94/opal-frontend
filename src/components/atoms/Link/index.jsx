import { forwardRef } from 'react'

import Tooltip from 'components/atoms/Tooltip'

import { Link } from './styles'

function LinkComponent(props, ref) {
  const otherProps = { ...props }

  if (props.external) {
    otherProps['target'] = '_blank'
  }

  return (
    <Tooltip label={props.href}>
      <Link
        ref={ref}
        onClick={props.openOnClick && openLink}
        {...otherProps}
      >
        {props.children}
      </Link>
    </Tooltip>
  )
}

export default forwardRef(LinkComponent)
