import { useEffect, useRef } from 'react'
import isEqual from 'fast-deep-equal'
import Link from 'next/link'

import BlockEditable from 'components/molecules/BlockEditable'
import Block from 'components/molecules/Block'

import {
  Container, EditorContainer,
  Editor, NoteTitle, Content,
} from './styles'

function NoteEditor({ isEditable, noteArticle, noteBlocks, loadingNoteBlocks, ...props }) {
  const blocksRef = useRef({})
  const { blocks, params, lastAction, blocksDispatch } = props

  useEffect(() => {
    // Update the blocks list ONLY when has been updated server-side
    if (
        !loadingNoteBlocks
        && Array.isArray(noteBlocks)
        && (!isEqual(noteBlocks, blocks) || noteBlocks.length === 0)
      ) {
      if (noteBlocks.length === 0) {
        // If block list is empty add a first block client-side
        blocksDispatch({ type: 'ADD_NEW', extra: noteArticle })
      } else {
        // Setup client-side list cloning the serverSide
        blocksDispatch({ type: 'INIT', payload: noteBlocks })
      }
    }
  }, [noteBlocks, loadingNoteBlocks])

  useEffect(() => {
    if (lastAction) {
      onReducerChange(lastAction)
    }
  }, [lastAction, params])

  return (
    <Container>
      <EditorContainer>
        <Editor>
          <NoteTitle
            level="h1"
            contentEditable
            suppressContentEditableWarning
            onBlur={onNoteTitleBlur}
          >
            {noteArticle.title}
          </NoteTitle>
          <Content>
            {renderBlocks()}
          </Content>
        </Editor>
      </EditorContainer>
    </Container>
  )

  function onNoteTitleBlur(evt) {
    let title = evt.target.innerText

    if (title === '') {
      title = 'Untitled'
    }

    if (typeof props.updateArticle === 'function') {
      props.updateArticle(noteArticle.id, { title })
    }
  }

  function renderBlocks() {
    return blocks.map((blk) => {
      if (isEditable) {
        return (
          <BlockEditable
            key={`BlockEditable_${blk.id}`}
            ref={el => blocksRef.current[blk.id] = el}
            block={blk}
            dispatch={blocksDispatch}
            url={props.baseUrl}
          />
        )
      } else {
        return (
          <Block
            key={`BlockNoteRead_${blk.id}`}
            block={blk}
            url={props.baseUrl}
            noAdd
          />
        )
      }
    })
  }

  function onReducerChange(action) {
    const { type, payload } = action

    console.log('ACTION', type)

    switch (type) {
      case 'APPEND': {
        const { block, newBlock } = params
        props.createBlock(block)
        props.createBlock(newBlock)
        break
      }
      case 'ADD_NEW': {
        const { block } = params
        props.createBlock(block)
        break
      }
      case 'UPDATE': {
        const { block } = params
        props.updateBlock(block)
        break
      }
      case 'UPDATE_ADD': {
        const { updated, newBlock } = params
        props.updateBlock(updated)
        props.createBlock(newBlock)

        // Focus on next block
        const { position } = updated
        const { id } = blocks[position + 1]

        setTimeout(() => blocksRef.current[id].focus())
        break
      }
      case 'DELETE': {
        const { block } = params
        props.deleteBlock(block)

        // Focus on previous block
        const { position } = payload
        if (position - 1 < 0) return
        const { id } = blocks[position - 1]

        setTimeout(() => blocksRef.current[id].focus())
        break
      }
    }
  }
}

export default NoteEditor
