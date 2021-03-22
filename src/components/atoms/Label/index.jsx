import { Label } from './styles'

export default function LabelComponent(props) {
  return (
    <Label {...props}>
      {props.children}
    </Label>
  )
}
