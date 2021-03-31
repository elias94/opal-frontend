import { useState, useRef } from 'react'
import { isURL, randomChoice } from 'shared/utils'
import KeyEvent from 'shared/keyboard'

import '@reach/dialog/styles.css'

import {
  Container, ButtonOpen, Icon, Dialog,
  InputUrl, ConfirmButton, DialogHeader,
  DialogContent, DialogError, IconButtonEl,
} from './styles'

const LINK_LIST = [
  'https://blog.readwise.io/stop-reading-junk-and-start-using-instapaper/',
  'http://paulgraham.com/ds.html',
]

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
          Import a new resource
          <IconButtonEl icon="times" onClick={closeDialog} />
        </DialogHeader>
        <DialogContent>
          <InputUrl ref={inputEl} onKeyDown={onInputKeydown} placeholder={randomChoice(LINK_LIST)} />
          <ConfirmButton className="close-button" onClick={onImportClick}>
            Import
          </ConfirmButton>
        </DialogContent>
        <div className="w-full pt-4 text-gray-400">
          <div className="text-left text-sm">You can import web articles and tweets at the moment.</div>
        </div>
        {error && (
          <DialogError className="w-full mx-auto">
            {error}
          </DialogError>
        )}
      </Dialog>
    </Container>
  )

  function onInputKeydown(evt) {
    const keyEvt = KeyEvent(evt)

    if (keyEvt.isEnter) {
      const url = inputEl.current.value.trim()
      submitInput(url)
    }
  }

  function onImportClick() {
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
      setError('Input string is not a valid URL')
    }
  }
}

export default ImportDialog
