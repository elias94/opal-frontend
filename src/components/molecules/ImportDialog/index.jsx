import { useState, useRef } from 'react'
import { isURL } from 'shared/utils'

import '@reach/dialog/styles.css'

import {
  Container, ButtonOpen, Icon, Dialog,
  InputUrl, ConfirmButton, DialogHeader,
  DialogContent, DialogError, IconButtonEl,
} from './styles'

function ImportDialog(props) {
  const inputEl = useRef(null)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(null)

  const openDialog = () => { setOpen(true); setError(null); }
  const closeDialog = () => setOpen(false)

  return (
    <Container>
      <ButtonOpen onClick={openDialog}>
        <Icon icon={"plus"} /> Import
      </ButtonOpen>
      <Dialog isOpen={open} onDismiss={closeDialog} aria-label="Import dialog">
        <DialogHeader>
          Paste a link and import an article
          <IconButtonEl icon="times" onClick={closeDialog} />
        </DialogHeader>
        <DialogContent>
          <InputUrl ref={inputEl} />
          <ConfirmButton className="close-button" onClick={onImportClick}>
            Import
          </ConfirmButton>
        </DialogContent>
        {error && (
          <DialogError>
            {error}
          </DialogError>
        )}
      </Dialog>
    </Container>
  )

  function onImportClick(evt) {
    const url = inputEl.current.value.trim()
    submitInput(url)
  }

  function submitInput(url) {
    if (isURL(url)) {
      if (typeof props.onLinkSubmit === 'function') {
        props.onLinkSubmit(url)
        closeDialog()
      }
    } else {
      setError('Url is not valid')
    }
  }
}

export default ImportDialog
