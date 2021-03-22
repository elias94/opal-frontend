import { forwardRef, useCallback } from 'react'

import Tooltip from 'components/atoms/Tooltip'
import Icon from 'components/atoms/Icon'

import { Link, ExternalIcon } from './styles'

function LinkComponent(props, ref) {
  const otherProps = { ...props }

  // function to open link in a new tab if inserted into a contenteditable
  // const openLink = useCallback(() => {
  //   const { href } = props

  //   if (href) {
  //     const win = window.open(href, '_blank')
  //     win.focus()
  //   }
  // }, [props])

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
        {/* {props.external && (
          <ExternalIcon>
            <Icon icon={"external-link-alt"} />
          </ExternalIcon>
        )} */}
      </Link>
    </Tooltip>
  )
}

export default forwardRef(LinkComponent)
