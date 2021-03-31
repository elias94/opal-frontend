import { useState, forwardRef } from 'react'

import '@reach/dialog/styles.css'

import {
  Container, ButtonOpen, Dialog,
  ConfirmButton, DialogHeader,
  DialogContent, IconButtonEl,
  CancelButton,
} from './styles'

function OkayCancelDialog(props, ref) {
  const [open, setOpen] = useState(false)

  const openDialog = () => setOpen(true)
  const closeDialog = () => setOpen(false)

  return (
    <Container ref={ref} {...props}>
      <ButtonOpen onClick={openDialog}>
        {props.children}
      </ButtonOpen>
      <Dialog isOpen={open} onDismiss={closeDialog} aria-label="Import dialog">
        <DialogHeader>
          {props.title}
          <IconButtonEl icon="times" onClick={closeDialog} />
        </DialogHeader>
        <DialogContent>
          {props.content}
          <ConfirmButton className="close-button" onClick={props.whenConfirmClick}>
            {props.buttonText || 'Okay'}
          </ConfirmButton>
          <CancelButton onClick={closeDialog}>
            Cancel
          </CancelButton>
        </DialogContent>
      </Dialog>
    </Container>
  )
}

export default forwardRef(OkayCancelDialog)
