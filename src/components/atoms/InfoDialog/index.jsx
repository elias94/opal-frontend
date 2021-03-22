import '@reach/dialog/styles.css'

import {
  Dialog, DialogButton
} from './styles'

function InfoDialog({ isOpen, closeDialog, ...props }) {
  return (
    <Dialog isOpen={isOpen} aria-label="Info Dialog">
      {props.children}
      <DialogButton onClick={closeDialog}>Ok</DialogButton>
    </Dialog>
  )
}

export default InfoDialog
