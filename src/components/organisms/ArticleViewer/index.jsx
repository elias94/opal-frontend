import { useEffect, useRef, useState, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Portal from '@reach/portal'
import { highlightsReducer } from 'shared/hooks'
import { extractDomainUrl } from 'shared/utils'
import { extractContentFromNode, extractStringFromMdast } from 'shared/libs/markdown'
import { generateNewHighlight } from 'shared/libs/highlight'

import NavbarViewer from 'components/molecules/NavbarViewerSingle'
import Block from 'components/molecules/Block'
import Tooltip from 'components/atoms/Tooltip'

import {
  Container, ArticleContainer,
  ArticleContent, TitleStyled,
  HighlightPopoverContainer,
  IconPopover, PopoverSeparator,
  Source, ArticleHeader,
} from './styles'

function ArticleViewer({ resource, blocks, highlightTextMode, ...props }) {
  const articleRef = useRef(null)
  const containerRef = useRef(null)
  const [highlights, dispatchHighlights] = useReducer(highlightsReducer, [])
  const [highlightTooltip, setHighlightTooltip] = useState(null)

  const { content, saved } = resource

  useEffect(() => {
    if (articleRef && articleRef.current) {
      if (highlightTextMode) {
        articleRef.current.addEventListener('mouseup', onHighlight)
      } else {
        articleRef.current.removeEventListener('mouseup', onHighlight)
      }

      return () => {
        articleRef.current && articleRef.current.removeEventListener('mouseup', onHighlight)
      }
    }
  }, [highlightTextMode])

  useEffect(() => {
    if (props.noteHighlights) {
      setTimeout(()=> {
        initializeHighlights(props.noteHighlights)
      }, 100)
    }
  }, [props.noteHighlights])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.onscroll = closeTooltip
    }
  }, [containerRef.current])
  
  if (!content) {
    return null
  }

  const [external, article] = content

  return (
    <Container ref={containerRef}>
      {props.isSingleArticle && (
        <NavbarViewer
          url={external.url}
          saved={!!saved}
          article={article}
          highlightTextMode={highlightTextMode}
          showMenuIcon={!props.articleMenuOpen}
          {...props}
        />
      )}
      <ArticleContainer>
        <ArticleContent ref={articleRef}>
          <ArticleHeader>
            <TitleStyled level={"h1"}>{article.title}</TitleStyled>
            <Source>
              <Tooltip label={external.url}>
                <a href={external.url} target="_blank" rel="noopener noreferrer">
                  {external.url && extractDomainUrl(external.url)}
                </a>
              </Tooltip>
            </Source>
          </ArticleHeader>
          {blocks && blocks.map((blk) => (
            <Block
              key={`Block_${blk.id}`}
              block={blk}
              url={external.url}
              {...props}
            />
          ))}
        </ArticleContent>
        {highlightTooltip !== null && (
          <Portal>
            <HighlightPopover
              highlight={highlightTooltip}
              closeTooltip={closeTooltip}
              removeHighlight={removeHighlight}
              addHighlight={addHighlight}
            />
          </Portal>
        )}
      </ArticleContainer>
    </Container>
  )

  function addHighlight(highlightId) {
    const h = highlights.find(h => h.highlightId === highlightId)
    
    if (typeof props.onAddHighlightClick === 'function') {
      props.onAddHighlightClick(h)
    }
  }

  function removeHighlight(highlight) {
    const { target, highlightId } = highlight

    target.replaceWith(...target.childNodes)

    dispatchHighlights({
      type: 'DELETE',
      payload: highlightId,
    })

    if (typeof props.deleteNoteHighlight === 'function') {
      props.deleteNoteHighlight(highlightId)
    }

    setHighlightTooltip(null)
  }

  function closeTooltip() {
    setHighlightTooltip(null)
  }

  function onHighlightClick(evt, highlightId) {
    const { target } = evt

    const rect = target.getBoundingClientRect()
    
    setHighlightTooltip({ position: rect, target, highlightId })
  }

  /**
   * Firefox vs Chrome/Safari, they have different behaviours.
   * Firefox support multihighlights so create multiples ranges for differents divs,
   * the others only one range.
   */
  function onHighlight() {
    const selection = document.getSelection()
    const { rangeCount } = selection

    function isHighlightNode(node) {
      return node.nodeName === 'SPAN' && node.classList.contains('highlighter')
    }

    function getHighlightId(node) {
      return node.dataset.highlightId
    }
  
    if (selection.isCollapsed || rangeCount === 0) {
      // nothing selected
      return
    }

    const allRanges = []
    let hasMultipleRanges = rangeCount > 1
    
    if (!hasMultipleRanges) {
      // Chrome/Safari or Firefox with single block
      const selectionRange = selection.getRangeAt(0)
      const { commonAncestorContainer } = selectionRange
    
      const ancestorNode = commonAncestorContainer.nodeType === Node.TEXT_NODE ? commonAncestorContainer.parentNode : commonAncestorContainer
      if (isHighlightNode(ancestorNode) || ancestorNode.closest('highlighter') !== null) {
        // Already inside highlight
        return
      }
    
      const { start, end } = extractRangeInfo(selectionRange)
    
      const startBlockId = start.blockEl.dataset.blockId
      const endBlockId = end.blockEl.dataset.blockId

      if (startBlockId === endBlockId) {
        // highlight start-end in the same block
        allRanges.push(selection.getRangeAt(0))
      } else {
        // highlight start-end in different blocks
        // needs to create different ranges
        hasMultipleRanges = true

        const startRange = document.createRange()
        startRange.setStart(selectionRange.startContainer, selectionRange.startOffset)
        startRange.setEnd(selectionRange.startContainer, start.element.innerText.length)
        allRanges.push(startRange)

        const startBlockIndex = blocks.findIndex(blk => blk.id === startBlockId)
        const endBlockIndex = blocks.findIndex(blk => blk.id === endBlockId)

        if (endBlockIndex - startBlockIndex > 1) {
          for (let i = startBlockIndex + 1; i < endBlockIndex; i++) {
            const blockId = blocks[i].id
            const blockEl = document.querySelector(`div[data-block-id="${blockId}"]`)
            const blockContentEl = blockEl.lastChild.firstChild
            const blockRange = document.createRange()
            blockRange.setStart(blockContentEl, 0)
            blockRange.setEnd(blockContentEl, blockContentEl.childNodes.length) 

            allRanges.push(blockRange)
          }
        }

        const endRange = document.createRange()
        endRange.setStart(selectionRange.endContainer, 0)
        endRange.setEnd(selectionRange.endContainer, selectionRange.endOffset)
        allRanges.push(endRange)
      }
    } else {
      // Firefox multiple ranges but the end of each range is the beginning of the next block.
      // So we fix the end of the range apply the last node of the current block
      const startRange = selection.getRangeAt(0)
      const startRangeLen = startRange.startContainer.nodeType === Node.TEXT_NODE ? 
        startRange.startContainer.nodeValue.length :
        startRange.startContainer.childNodes.length
      startRange.setEnd(startRange.startContainer, startRangeLen)
      allRanges.push(startRange)

      for (let i = 1; i < rangeCount - 1; i++) {
        const range = selection.getRangeAt(i).cloneRange()

        range.setStart(range.startContainer.firstChild, 0)
        range.setEnd(range.startContainer, range.startContainer.childNodes.length)

        allRanges.push(range)
      }

      const endRange = selection.getRangeAt(rangeCount - 1)
      endRange.setStart(endRange.startContainer.firstChild, 0)
      allRanges.push(endRange)
    }
  
    // Loop for every separated highlights
    allRanges.forEach((range) => {
      const { start, end } = extractRangeInfo(range)
      const childNodes = [...range.cloneContents().childNodes]
      const nodes = []
      const removedHighlightsIds = []
  
      if (isHighlightNode(childNodes[0])) {
        // first part is highlight
        nodes.push(...start.element.childNodes)
        removedHighlightsIds.push(getHighlightId(childNodes[0]))
        start.element.remove()
      } else {
        // first part is other block
        nodes.push(childNodes[0])
      }
  
      if (childNodes.length > 1) {
        // push all the other node in the range (1, childNode.length-1)
        for (let i = 1; i < childNodes.length - 1; i++) {
          if (isHighlightNode(childNodes[i])) {
            nodes.push(...childNodes[i].childNodes)
            removedHighlightsIds.push(getHighlightId(childNodes[i]))
          } else {
            nodes.push(childNodes[i])
          }
        }
    
        if (isHighlightNode(childNodes[childNodes.length - 1])) {
          // last part is highlight
          nodes.push(...end.element.childNodes)
          removedHighlightsIds.push(getHighlightId(childNodes[childNodes.length - 1]))
          end.element.remove()
        } else {
          // last part is other block
          nodes.push(childNodes[childNodes.length - 1])
        }
      }
  
      // Generate highlight wrapper component
      const highlightId = uuidv4()
      const hcontainer = document.createElement('span')
      hcontainer.classList.add('highlighter')
      hcontainer.dataset.highlightId = highlightId
      hcontainer.append(...nodes)
  
      hcontainer.onclick = (evt) => onHighlightClick(evt, highlightId)

      hcontainer.normalize() // https://developer.mozilla.org/en-US/docs/Web/API/Node/normalize

      range.deleteContents()
      range.insertNode(hcontainer)
      
      // Extract the block element and calculate the length of the previous block
      // optaining the offset from the beginning of the block
      const blockContentEl = start.blockEl.lastChild.firstChild
      const blockId = start.blockEl.dataset.blockId
      const length = nodeTextLength(blockContentEl, hcontainer)

      const offset = { start: length, end: length + hcontainer.innerText.length }
      const content = extractContentFromNode(hcontainer).children[0].children
      const raw = extractStringFromMdast(content)

      removedHighlightsIds.forEach(hId => {
        dispatchHighlights({
          type: 'DELETE',
          payload: hId,
        })

        if (typeof props.deleteNoteHighlight === 'function') {
          props.deleteNoteHighlight(hId)
        }
      })

      dispatchHighlights({
        type: 'ADD',
        payload: { highlightId, blockId, offset, content, raw }
      })

      if (typeof props.createNoteHighlight === 'function') {
        const highlight = generateNewHighlight(
          highlightId,
          props.resourceId,
          props.user.id,
          blockId,
          { content, offset, raw },
        )
        props.createNoteHighlight(highlight)
      }
    })
  
    selection.removeAllRanges()
  }

  function initializeHighlights(highlights) {
    /**
     * Count the character inside each nodes util we reach the offset and we
     * check the string is the content.
     */
    const selection = document.getSelection()
  
    highlights.forEach(({ id, note_id: noteId, block_id: blockId, content: hContent }) => {
      const { offset, content, raw } = hContent
      const blockEl = document.querySelector(`div[data-block-id="${blockId}"]`)
  
      if (!blockEl) {
        return
      }
  
      const blockContentEl = blockEl.lastChild.firstChild
      const contentNodes = [...blockContentEl.childNodes]
      let count = 0
  
      let i = 0
      while (1) {
        const node = contentNodes[i]
  
        if (!node) {
          break
        }
  
        let textLength
        if (node.nodeType === Node.TEXT_NODE) {
          const nodeLength = node.nodeValue.length
  
          if (nodeLength > offset.start) {
            // Text portion is inside
            const noteContent = node.nodeValue.slice(offset.start, offset.end)
            const contentText = extractStringFromMdast(content)

            console.log(noteContent, contentText)
  
            if (noteContent === contentText) {
              const hcontainer = document.createElement('span')
              hcontainer.classList.add('highlighter')
              hcontainer.dataset.highlightId = id
              hcontainer.innerHTML = raw
          
              hcontainer.onclick = (evt) => onHighlightClick(evt, id)
  
              hcontainer.normalize() // https://developer.mozilla.org/en-US/docs/Web/API/Node/normalize
  
              const range = document.createRange()
              range.setStart(node, offset.start)
              range.setEnd(node, offset.end)
  
              selection.addRange(range)
              range.deleteContents()
              range.insertNode(hcontainer)
  
              dispatchHighlights({
                type: 'ADD',
                payload: { highlightId: id, blockId, offset, content, raw }
              })
            }
          } // else continue to the next block
        }
  
        i++
      }
    })
  
    selection.removeAllRanges()
  }
}

export default ArticleViewer

function HighlightPopover({ highlight, closeTooltip, ...props }) {
  const node = useRef()

  const { position } = highlight

  const left = position.x + (position.width / 2) - (84/2)
  const top = position.y - 40

  function handleClickOutside(evt) {
    if (node.current.contains(evt.target)) {
      return
    }

    typeof closeTooltip === 'function' && closeTooltip()
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  })

  return (
    <HighlightPopoverContainer ref={node} top={top} left={left}>
      <Tooltip label="Delete highlight" style={{ marginTop: '.5rem'  }}>
        <IconPopover icon={'trash-alt'} onClick={removeHighlight} />
      </Tooltip>
      <PopoverSeparator />
      <Tooltip label="Add highlight to note" style={{ marginTop: '.5rem'  }}>
        <IconPopover icon={['far', 'plus-square']} onClick={addHighlight} />
      </Tooltip>
    </HighlightPopoverContainer>
  )

  function removeHighlight() {
    if (typeof props.removeHighlight === 'function') {
      props.removeHighlight(highlight)
    }
  }

  function addHighlight() {
    const { highlightId } = highlight

    if (typeof props.addHighlight === 'function') {
      props.addHighlight(highlightId)
    }
  }
}

// Calculate the offset of the highlight inside the block with a loop trought all the nodes
function nodeTextLength(node, highlightContainer) {
  const contentNodes = [...node.childNodes]
  let count = 0

  let i = 0
  while(1) {
    const node = contentNodes[i]

    if (!node || node === highlightContainer) {
      break
    }

    if (node.nodeType === Node.TEXT_NODE) {
      count += node.nodeValue.length
    } else if (node.nodeName === 'SPAN' && node.classList.contains('highlighter')) {
      count += node.innerText.length
    } else {
      count += nodeTextLength(node, highlightContainer)
    }

    i++
  }

  return count
}

/**
 * Extract information from the range as the start/end DOM Node and Block DOM Node
 * @param {*} range 
 */
function extractRangeInfo(range) {
  const { startContainer, endContainer } = range

  const startEl = startContainer.nodeType === Node.TEXT_NODE ? startContainer.parentNode : startContainer
  const endEl = endContainer.nodeType === Node.TEXT_NODE ? endContainer.parentNode : endContainer

  const startBlockEl = startEl.closest('div[data-block-id]')
  const endBlockEl = endEl.closest('div[data-block-id]')

  return {
    start: {
      element: startEl,
      blockEl: startBlockEl,
    },
    end: {
      element: endEl,
      blockEl: endBlockEl,
    }
  }
}
