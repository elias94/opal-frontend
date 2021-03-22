import { forwardRef } from 'react'
import { Title } from './styles'

function TitleComponent(props, ref) {
  const { level } = props
  let component

  switch(level) {
    case 'h1':
      component = (<Title.h1 ref={ref} {...props}>{props.children}</Title.h1>)
      break
    case 'h2':
      component = (<Title.h2 ref={ref} {...props}>{props.children}</Title.h2>)
      break
    case 'h3':
      component = (<Title.h3 ref={ref} {...props}>{props.children}</Title.h3>)
      break
    case 'h4':
      component = (<Title.h4 ref={ref} {...props}>{props.children}</Title.h4>)
      break
    case 'h5':
      component = (<Title.h5 ref={ref} {...props}>{props.children}</Title.h5>)
      break
    case 'h6':
      component = (<Title.h6 ref={ref} {...props}>{props.children}</Title.h6>)
      break
    default:
      component = (<Title.h3 ref={ref} {...props}>{props.children}</Title.h3>)
      break
  }

  return component
}

export default forwardRef(TitleComponent)
