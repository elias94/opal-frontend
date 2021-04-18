import { useState, useRef, forwardRef } from 'react'
import { isURL, randomChoice } from 'shared/utils'
import KeyEvent from 'shared/keyboard'

import Tooltip from 'components/atoms/Tooltip'

import '@reach/dialog/styles.css'

import {
  Container, ButtonOpen, Icon, Dialog,
  InputUrl, ConfirmButton, DialogHeader,
  DialogContent, DialogError, IconButtonEl,
} from './styles'

const LINK_LIST = [
  'https://blog.readwise.io/stop-reading-junk-and-start-using-instapaper/',
  'http://paulgraham.com/ds.html'
]

function ImportDialog(props, ref) {
  const inputEl = useRef(null)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(null)

  const openDialog = () => { setOpen(true); setError(null); }
  const closeDialog = () => setOpen(false)

  return (
    <Container>
      <Tooltip label="Import an external resource">
        <ButtonOpen onClick={openDialog}>
          <Icon icon={"plus"} /> Import
        </ButtonOpen>
      </Tooltip>
      <Dialog isOpen={open} onDismiss={closeDialog} aria-label="Import dialog">
        <DialogHeader>
          Import a new resource
          <IconButtonEl icon="times" onClick={closeDialog} />
        </DialogHeader>
        <DialogContent>
          <div className="w-full pb-2 text-gray-400">
            <div className="text-left text-sm">You can import web articles and tweets at the moment.</div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <InputUrl ref={inputEl} onKeyDown={onInputKeydown} placeholder="Insert a complete link" />
            <ConfirmButton className="close-button" onClick={onImportClick}>
              Import
            </ConfirmButton>
          </div>
        </DialogContent>
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

export default forwardRef(ImportDialog)
