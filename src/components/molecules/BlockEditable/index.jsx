import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import remark from 'remark'
import remarkgfm from 'remark-gfm'
import remarkmath from 'remark-math'
import visit from 'unist-util-visit'
import KeyEvent from 'shared/keyboard'
import { useThrottle } from 'shared/hooks'
import { generateNewBlock } from 'shared/libs/block'
import {
  placeCaretAtEnd,
  getSelectionInfo,
  splitBlock
} from 'shared/DOM/selection'
import doubleParenthesisLink from 'shared/remark/double-parenthesis-link'

import Block from 'components/molecules/Block'

import {
  Container, BulletContainer,
  Content, Bullet, EditableElement,
} from './styles'

function BlockEditable({ block, dispatch, ...props }, ref) {
  const editableEl = useRef(null)
  const [editable, setEditable] = useState(false)
  const [mouseHover, setMouseHover] = useState(false)
  // If the block should update on blur or not (DEFAULT = true)
  const [shouldUpdateBlock, setShouldUpdateBlock] = useState(true)

  const saveContent = useThrottle(saveBlockContentToLocalStorage, 1000)
  const storeContent = useThrottle(saveBlockContentToServer, 3000)

  const { properties } = block

  useEffect(() => {
    // When Block become editable, place the focus on the editable element and the caret at the end
    if (editable) {
      editableEl.current.focus()
      placeCaretAtEnd(editableEl.current)
    }
  }, [editable])

  useImperativeHandle(ref, () => ({
    focus: () => {
      setEditable(true)
    },
  }))

  return (
    <Container
      indent={block.indent}
      onClick={onBlockClick}
      onMouseEnter={() => setMouseHover(true)}
      onMouseLeave={() => setMouseHover(false)}
    >
      <BulletContainer>
        <div style={{ height: '30px', width: '20px' }}></div>
        {/* <Bullet visible={mouseHover} focused={editable} onClick={onBlockBulletClick} /> */}
      </BulletContainer>
      <Content>
        {editable ? (
          <EditableElement
            ref={editableEl}
            contentEditable
            suppressContentEditableWarning
            onBlur={onEditableBlur}
            onKeyDown={onEditableKeydown}
            onInput={onEditableChange}
          >
            {properties.raw}
          </EditableElement>
        ) : (
          <Block block={block} editable />
        )}
      </Content>
    </Container>
  )

  function onBlockClick() {
    setEditable(true)
  }

  function onBlockBulletClick() {
    // dispatch({ type: 'DELETE', payload: block })
  }

  function onEditableBlur() {
    const { id: blockId } = block
    let markdownText = editableEl.current.innerText

    if (markdownText === '\n') {
      markdownText = ''
    }

    // Clear running timeouts
    saveContent.clear()
    storeContent.clear()

    let updatedBlock

    if (shouldUpdateBlock) {
      updatedBlock = parseContentForMatches(markdownText, block)
      
      if (!updatedBlock) {
        updatedBlock = getUpdatedBlock(markdownText, block)
      }

      dispatch({
        type: 'UPDATE',
        payload: updatedBlock,
      })
    }

    // Save content to server
    saveToServer(markdownText, updatedBlock)

    // Clear localStorage buffer
    localStorage.removeItem(blockId)

    setEditable(false)
    setShouldUpdateBlock(true)
  }

  function onEditableKeydown(evt) {
    const keyEvt = KeyEvent(evt)

    if (keyEvt.isEsc)
    {
      // ESC
      evt.preventDefault()

      editableEl.current.blur()
    }
    else if (keyEvt.isEnter)
    {
      // ENTER
      evt.preventDefault()

      const markdownText = editableEl.current.innerText

      setShouldUpdateBlock(false)

      const commandBlock = parseContentForMatches(markdownText, block)

      if (commandBlock) {
        // Command block detected, update the block and add a new one
        dispatch({
          type: 'UPDATE_ADD',
          payload: commandBlock,
        })
      } else {
        const { isCursorAtTheEnd } = getSelectionInfo()
        const { prevEl, nextEl } = splitBlock() // check the previous and the next element respect to the current selection

        if (isCursorAtTheEnd || (nextEl && nextEl.innerText === '')) {
          dispatch({
            type: 'UPDATE_ADD',
            payload: getUpdatedBlock(markdownText, block),
          })
        } else {
          const prevBlock = getUpdatedBlock(prevEl.innerText, block)
          let nextBlock = generateNewBlock(prevBlock, null, nextEl.innerText)
          nextBlock = getUpdatedBlock(nextEl.innerText, nextBlock)

          dispatch({
            type: 'UPDATE_ADD',
            payload: [prevBlock, nextBlock],
          })
        }
      }
    }
    else if (keyEvt.isBackspace)
    {
      // BACKSPACE
      let markdownText = editableEl.current.innerText
      const { isCursorAtBeginning } = getSelectionInfo()

      if (markdownText === '\n') {
        markdownText = ''
      }

      if (markdownText.length === 0) {
        evt.preventDefault()

        dispatch({ type: 'DELETE', payload: block })
      } else if (isCursorAtBeginning && block.position > 0) {
        const selection = document.getSelection()

        if (!selection.isCollapsed) {
          return
        }

        evt.preventDefault()

        const prev = props.getPreviousBlock(block)
        const newContent = prev.properties.raw + markdownText
        const newBlock = getUpdatedBlock(newContent, prev)

        dispatch({ type: 'DELETE_UPDATE', payload: [block, newBlock] })
      }
    }
    else if (keyEvt.isTab)
    {
      // TAB
      evt.preventDefault()

      if (keyEvt.isShiftPressed) {
        if (block.indent > 0) {
          const newBlock = { ...block, indent:  block.indent - 1 }
          dispatch({ type: 'UPDATE', payload: newBlock })
        }
      } else {
        const prev = props.getPreviousBlock(block)

        if (block.indent < prev.indent + 1) {
          const newBlock = { ...block, indent: block.indent + 1 }
          dispatch({ type: 'UPDATE', payload: newBlock })
        }
      }
    }
    else if (keyEvt.isArrowUp) {
      const { isCursorAtBeginning } = getSelectionInfo()

      if (isCursorAtBeginning) {
        evt.preventDefault()

        props.focusPrevBlock(block)
      }
    }
    else if (keyEvt.isArrowDown) {
      const { isCursorAtTheEnd } = getSelectionInfo()

      if (isCursorAtTheEnd) {
        evt.preventDefault()

        props.focusNextBlock(block)
      }
    }
  }

  function onEditableChange() {
    const markdownText = editableEl.current.innerText

    saveContent.exec(markdownText)
  }

  function saveBlockContentToLocalStorage(content) {
    const { id: blockId } = block

    localStorage.setItem(blockId, content)

    // Call the store-content-to-server with a throttle
    storeContent.exec()
  }

  function saveBlockContentToServer() {
    const { id: blockId } = block

    const markdownText = localStorage.getItem(blockId)

    saveToServer(markdownText)
  }

  function saveToServer(markdownText, updatedBlock) {
    // save updated block to server
    if (!updatedBlock) {
      updatedBlock = getUpdatedBlock(markdownText, block)
    }

    if (typeof props.updateBlock === 'function') {
      props.updateBlock(updatedBlock)
    }
  }
}

export default forwardRef(BlockEditable)

function parseMarkdown(text) {
  return remark()
    .use(remarkgfm)
    .use(remarkmath)
    .parse(text)
}

function checkLinks(tree) {
  const links = []

  visit(tree, ['link', 'internal_link'], (node) => {
    links.push(node.url)
  })

  return links
}

function getUpdatedBlock(markdownText, block) {
  const _mdast = parseMarkdown(markdownText)
  doubleParenthesisLink(_mdast)
  
  const links = checkLinks(_mdast)
  const mdast = _mdast.children
  const isEmpty = mdast.length === 0
  const isInternalBlock = block.type === 'internal_block'
  const isInternalHighlight = block.type === 'internal_highlight'

  let content = isEmpty ? [] : mdast[0].children

  let type = 'paragraph'
  let list = null
  let raw = markdownText
  const extra = {}

  if (!isEmpty) {
    const node = mdast[0]

    if (isInternalBlock) {
      type = 'internal_block'
    } else if (isInternalHighlight) {
      // untouched
      type = 'internal_highlight'
      raw = block.properties.raw
      content = block.content
    } else if (node.type === 'heading') {
      type = node.type
      extra.depth = node.depth
    } else if (node.type === 'blockquote') {
      type = node.type
    } else if (node.type === 'list') {
      list = node.ordered ? 'o' : 'b'
      // Yes i know...
      try {
        content = node.children[0].children[0].children
      } catch {
        console.log(node)
      }
    }

    // if (mdast.length > 1) {
    //   for (let i = 1; i < mdast.length; i++) {
    //     const extraNode = mdast[i]

    //     // { previous, newBlock }
    //   }
    // }
  }

  return {
    ...block,
    type,
    properties: {
      ...block.properties,
      ...extra,
      raw,
      links,
    },
    list,
    content,
  }
}

const TWITTER_R = /^http(s)?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)(\s){0,2}$/
const UUID_R = /^(\(){2}(\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b)(\)){2}(\s){0,2}$/

function parseContentForMatches(markdownText, block) {
  let match

  if ((match = markdownText.match(TWITTER_R)) !== null) {
    const tweetId = match[4]

    const updateBlock = {
      ...block,
      type: 'tweet',
      properties: {
        ...block.properties,
        raw: markdownText,
        tweetId,
      },
      content: [],
    }

    return updateBlock
  } else if ((match = markdownText.match(UUID_R)) !== null) {
    const blockId = match[2]

    const updateBlock = {
      ...block,
      type: 'internal_block',
      properties: {
        ...block.properties,
        raw: markdownText,
        ref: {
          block_id: blockId,
        },
      },
      content: [],
    }

    return updateBlock
  } else if ((match = markdownText.match(UUID_R)) !== null) {

  }

  return null
}
