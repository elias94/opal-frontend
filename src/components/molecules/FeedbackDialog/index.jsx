import { useState, useRef } from 'react'

import Icon from 'components/atoms/Icon'

import '@reach/dialog/styles.css'

import {
  Container, OpenContainer, Dialog,
  InputTextArea, ConfirmButton, DialogHeader,
  DialogContent, DialogError, IconButtonEl,
} from './styles'

function FeedbackDialog(props) {
  const inputEl = useRef(null)
  const [open, setOpen] = useState(false)
  const [thanks, setThanks] = useState(false)

  const openDialog = () => setOpen(true)
  const closeDialog = () => { setOpen(false); setThanks(false) }

  return (
    <Container>
      <OpenContainer onClick={openDialog}>
        {props.children}
      </OpenContainer>
      <Dialog isOpen={open} onDismiss={closeDialog} aria-label="Import dialog">
        {thanks ? (
          <>
            <DialogHeader end>
              <IconButtonEl icon="times" onClick={closeDialog} />
            </DialogHeader>
            <div className="w-full">
              <div className="flex flex-col items-center">
                <div className="font-black text-5xl tracking-tight">Thank you!</div>
                <div className="mb-10 rounded-full w-10 h-10 my-4 bg-green-400 text-white flex items-center justify-center">
                  <Icon icon="check" />
                </div>
                <ConfirmButton className="close-button" onClick={closeDialog} small>
                  Close
                </ConfirmButton>
              </div>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              Share a feedback
              <IconButtonEl icon="times" onClick={closeDialog} />
            </DialogHeader>
            <DialogContent>
              <span className="text-left mb-2 text-gray-400 text-sm">Did you like the app? Something missing? Did you get some errors?</span>
              <InputTextArea ref={inputEl} placeholder="Everything is appreciated" />
              <ConfirmButton className="close-button" onClick={onSendClick}>
                Send
              </ConfirmButton>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  )

  function onSendClick() {
    const value = inputEl.current.value.trim()

    if (value.length > 0) {
      props.sendFeedback(value)

      setThanks(true)

      setTimeout(closeDialog, 1500)
    } else {
      closeDialog()
    }
  }
}

export default FeedbackDialog
