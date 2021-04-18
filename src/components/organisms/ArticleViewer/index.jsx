import { useEffect, useRef, useState, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Portal from '@reach/portal'
import { highlightsReducer } from 'shared/hooks'
import { extractDomainUrl } from 'shared/utils'
import { extractContentFromNode, extractStringFromMdast, extractTextFromNode, extractMarkdownFromRange } from 'shared/libs/markdown'
import { generateNewHighlight } from 'shared/libs/highlight'
import { occurrences } from 'shared/libs/string'
import { updateBlockRawMarkdown } from 'shared/libs/block'

import Block from 'components/molecules/Block'
import Tooltip from 'components/atoms/Tooltip'
import LoadingOverlay from 'components/atoms/LoadingOverlay'
import FooterHome from 'components/organisms/FooterHome'

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

  const { type, resource: external, content: article, saved } = resource

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

  return (
    <Container ref={containerRef}>
      <ArticleContainer>
        <ArticleContent ref={articleRef}>
          <ArticleHeader>
            <TitleStyled level={"h1"}>{article.title}</TitleStyled>
            <Source>
              <Tooltip label={external.url || ''}>
                <a
                  href={external.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center"
                >
                  <img
                    className="w-6 h-6 mr-1 rounded-sm"
                    src={`https://s2.googleusercontent.com/s2/favicons?domain=${external.url}&sz=${64}`}
                  />
                  {external.url && extractDomainUrl(external.url)}
                </a>
              </Tooltip>
            </Source>
          </ArticleHeader>
          {blocks ? blocks.map((blk) => (
            <Block
              key={`Block_${blk.id}`}
              block={blk}
              url={external.url}
              noAdd={props.isSingleArticle}
              copyBlockLinkToClipboard={props.copyBlockLinkToClipboard}
              {...props}
            />
          )) : (
            <div>
              <LoadingOverlay />
            </div>
          )}
        </ArticleContent>
        {highlightTooltip !== null && (
          <Portal>
            <HighlightPopover
              highlight={highlightTooltip}
              closeTooltip={closeTooltip}
              removeHighlight={removeHighlight}
              addHighlight={addHighlight}
              showAddButton={!props.isSingleArticle}
            />
          </Portal>
        )}
        <FooterHome {...props} />
      </ArticleContainer>
    </Container>
  )

  function addHighlight(highlightId) {
    const h = highlights.find(h => h.highlightId === highlightId)
    
    //
    // ADD THE RESOURCE ID TO THE PROPERTIES
    //

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

    /**
     * Function utils to find if the current node is
     * an highlight node
     */
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
    
    /**
     * Range preparation. Broswers threat ranges with different API,
     * so here we tried to standardize all of them and divide the ranges if they include
     * multiple blocks. Each highlight is created by block, so they need to be splitted
     * into multiples ranges
     */
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
        allRanges.push({ range: selection.getRangeAt(0), blockId: startBlockId })
      } else {
        // highlight start-end in different blocks
        // needs to create different ranges
        hasMultipleRanges = true

        const startRange = document.createRange()
        
        try {
          startRange.setStart(selectionRange.startContainer, selectionRange.startOffset)
          startRange.setEnd(selectionRange.startContainer, start.element.innerText.length)
        } catch {
          startRange.setStart(selectionRange.startContainer, selectionRange.startOffset)
          startRange.setEnd(selectionRange.startContainer, selectionRange.startContainer.length)
        }

        allRanges.push({ range: startRange, blockId: startBlockId })

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

            allRanges.push({ range: blockRange, blockId })
          }
        }

        const endRange = document.createRange()
        endRange.setStart(selectionRange.endContainer, 0)
        endRange.setEnd(selectionRange.endContainer, selectionRange.endOffset)
        allRanges.push({ range: endRange, blockId: endBlockId })
      }
    } else {
      // Firefox multiple ranges but the end of each range is the beginning of the next block.
      // So we fix the end of the range apply the last node of the current block
      const startRange = selection.getRangeAt(0)
      const startRangeLen = startRange.startContainer.nodeType === Node.TEXT_NODE ? 
        startRange.startContainer.nodeValue.length :
        startRange.startContainer.childNodes.length
      startRange.setEnd(startRange.startContainer, startRangeLen)
      var { start } = extractRangeInfo(startRange)
      const startBlockId = start.blockEl.dataset.blockId
      allRanges.push({ range: startRange, blockId: startBlockId })

      for (let i = 1; i < rangeCount - 1; i++) {
        const range = selection.getRangeAt(i).cloneRange()

        range.setStart(range.startContainer.firstChild, 0)
        range.setEnd(range.startContainer, range.startContainer.childNodes.length)

        const { start } = extractRangeInfo(range)
        const blockId = start.blockEl.dataset.blockId

        allRanges.push({ range, blockId })
      }

      const endRange = selection.getRangeAt(rangeCount - 1)
      endRange.setStart(endRange.startContainer.firstChild, 0)
      var { end } = extractRangeInfo(endRange)
      const endBlockId = end.blockEl.dataset.blockId
      allRanges.push({ range: endRange, blockId: endBlockId })
    }
  
    // Loop for every separated highlights
    allRanges.forEach(({ range, blockId }) => {
      const { start, end } = extractRangeInfo(range)
      const childNodes = [...range.cloneContents().childNodes]
      const nodes = []
      const removedHighlightsIds = []

      const mdFromSelection = extractMarkdownFromRange(range).replace(/\n/g, '')
      const block = blocks.find(blk => blk.id === blockId)
      const rawMd = block.properties.raw.slice(0).replace(/\n/g, '')

      const countOccurrences = occurrences(rawMd, mdFromSelection)

      console.log(countOccurrences, rawMd, mdFromSelection)

      if (countOccurrences === 0) {
        return
      } else if (countOccurrences === 1) {
        console.log('inside')
        // We can safely modify the markdown inside the block
        const index = rawMd.indexOf(mdFromSelection)

        const updatedMd = rawMd.slice(0, index)
          + '^^'
          + rawMd.slice(index, index + mdFromSelection.length)
          + '^^'
          + rawMd.slice(index + mdFromSelection.length)

        const newBlock = updateBlockRawMarkdown(block, updatedMd)
        props.dispatch({
          type: 'UPDATE',
          payload: newBlock,
        })
      } else {
        // We need to convert the html to markdown and obtain a position
        // where to start modify the original content

      }

      console.log(block.properties.raw, mdFromSelection)
  
      // if (isHighlightNode(childNodes[0])) {
      //   // first part is highlight
      //   nodes.push(...start.element.childNodes)
      //   removedHighlightsIds.push(getHighlightId(childNodes[0]))
      //   start.element.remove()
      // } else {
      //   // first part is other block
      //   nodes.push(childNodes[0])
      // }
  
      // if (childNodes.length > 1) {
      //   // push all the other node in the range (1, childNode.length-1)
      //   for (let i = 1; i < childNodes.length - 1; i++) {
      //     if (isHighlightNode(childNodes[i])) {
      //       nodes.push(...childNodes[i].childNodes)
      //       removedHighlightsIds.push(getHighlightId(childNodes[i]))
      //     } else {
      //       nodes.push(childNodes[i])
      //     }
      //   }
    
      //   if (isHighlightNode(childNodes[childNodes.length - 1])) {
      //     // last part is highlight
      //     nodes.push(...end.element.childNodes)
      //     removedHighlightsIds.push(getHighlightId(childNodes[childNodes.length - 1]))
      //     end.element.remove()
      //   } else {
      //     // last part is other block
      //     nodes.push(childNodes[childNodes.length - 1])
      //   }
      // }
  
      // // Generate highlight wrapper component
      // const highlightId = uuidv4()
      // const hcontainer = document.createElement('span')
      // hcontainer.classList.add('highlighter')
      // hcontainer.dataset.highlightId = highlightId
      // hcontainer.append(...nodes)
  
      // hcontainer.onclick = (evt) => onHighlightClick(evt, highlightId)

      // hcontainer.normalize() // https://developer.mozilla.org/en-US/docs/Web/API/Node/normalize

      // range.deleteContents()
      // range.insertNode(hcontainer)
      
      // // Extract the block element and calculate the length of the previous block
      // // optaining the offset from the beginning of the block
      // const blockContentEl = start.blockEl.lastChild.firstChild
      // const blockId = start.blockEl.dataset.blockId
      // const length = nodeTextLength(blockContentEl, hcontainer)

      // const offset = { start: length, end: length + hcontainer.innerText.length }
      // const content = extractContentFromNode(hcontainer).children[0].children
      // const raw = extractStringFromMdast(content)

      // removedHighlightsIds.forEach(hId => {
      //   dispatchHighlights({
      //     type: 'DELETE',
      //     payload: hId,
      //   })

      //   if (typeof props.deleteNoteHighlight === 'function') {
      //     props.deleteNoteHighlight(hId)
      //   }
      // })

      // dispatchHighlights({
      //   type: 'ADD',
      //   payload: { highlightId, blockId, offset, content, raw }
      // })

      // if (typeof props.createNoteHighlight === 'function') {
      //   const highlight = generateNewHighlight(
      //     highlightId,
      //     props.resourceId,
      //     props.user.id,
      //     blockId,
      //     { content, offset, raw },
      //   )
      //   props.createNoteHighlight(highlight)
      // }
    })
  
    // selection.removeAllRanges()
  }

  function initializeHighlights(highlights) {
    /**
     * Count the character inside each nodes util we reach the offset and we
     * check the string is the content.
     */
    const selection = document.getSelection()

    console.log(highlights)

    function createHighlight(
      highlightId,
      startNode,
      endNode,
      startOffset,
      endOffset,
      blockId,
      hContent,
    ) {
      const { offset, content, raw } = hContent
      const hcontainer = document.createElement('span')
      hcontainer.classList.add('highlighter')
      hcontainer.dataset.highlightId = highlightId
      hcontainer.innerHTML = raw
  
      hcontainer.onclick = (evt) => onHighlightClick(evt, highlightId)

      hcontainer.normalize() // https://developer.mozilla.org/en-US/docs/Web/API/Node/normalize

      const range = document.createRange()

      try {
        range.setStart(startNode, startOffset)
        range.setEnd(endNode, endOffset)
      } catch(e) {
        console.log(e, hContent, startNode, endNode, startOffset, endOffset)
        return
      }

      selection.addRange(range)
      range.deleteContents()
      range.insertNode(hcontainer)

      dispatchHighlights({
        type: 'ADD',
        payload: { highlightId, blockId, offset, content, raw }
      })
    }
  
    highlights.forEach(({ id, note_id: noteId, block_id: blockId, content: hContent }) => {
      const { offset, content, raw } = hContent
      const blockEl = document.querySelector(`div[data-block-id="${blockId}"]`)
  
      if (!blockEl) {
        return
      }
  
      const blockContentEl = blockEl.lastChild.firstChild
      const contentNodes = [...blockContentEl.childNodes]
      let count = 0
      let startNode, endNode
      let startCount
  
      let i = 0
      while (1) {
        const node = contentNodes[i]
  
        if (!node) {
          break
        }
  
        if (node.nodeType === Node.TEXT_NODE) {
          const nodeLength = node.nodeValue.length
  
          if (!startNode && count + nodeLength > offset.start) {
            // If startNode is still not set and the start-offset is inside the current node, save the node
            startNode = node
            startCount = offset.start - count
          }

          if (count + nodeLength > offset.end) {
            // ending-offset is inside the current node, so save the highlight
            // console.log('startNode', startNode)
            // console.log('count', count)
            // console.log('nodeLength', nodeLength)
            // console.log('node', node)
            // console.log('content', content)
            // console.log('offset', offset)

            createHighlight(
              id,
              startNode,
              node,
              startCount,
              offset.end - count,
              blockId,
              hContent
            )
            return
          }

          count += nodeLength
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const nodeLength = node.innerText.length

          if (!startNode && count + nodeLength > offset.start) {
            // If startNode is still not set and the start-offset is inside the current node, save the node
            startNode = node
            startCount = offset.start - count
          }

          if (count + nodeLength > offset.end) {
            // ending-offset is inside the current node, so save the highlight
            // console.log('startNode', startNode)
            // console.log('count', count)
            // console.log('nodeLength', nodeLength)
            // console.log('node', node)
            // console.log('content', content)
            // console.log('offset', offset)
            createHighlight(
              id,
              startNode,
              node,
              startCount,
              offset.end - count,
              blockId,
              hContent
            )
            return
          }

          count += nodeLength
        }
  
        i++
      }
    })
  
    selection.removeAllRanges()
  }
}

export default ArticleViewer

function HighlightPopover({ highlight, closeTooltip, showAddButton, ...props }) {
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
      {showAddButton && (
        <>
        <PopoverSeparator />
        <Tooltip label="Add highlight to note" style={{ marginTop: '.5rem'  }}>
          <IconPopover icon={['far', 'plus-square']} onClick={addHighlight} />
        </Tooltip>
        </>
      )}
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
