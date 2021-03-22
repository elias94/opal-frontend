/**
 * Place the caret at the end
 * @param {HTMLElement} element element to place selection
 */
export function placeCaretAtEnd(element) {
  const selection = document.getSelection()
  const range = document.createRange()
  range.setStart(element, element.childNodes.length)
  range.collapse(true)
  selection.removeAllRanges()
  selection.addRange(range)
}

/**
 * Extract info from active element
 */
export function getSelectionInfo() {
  const selectedElement = document.activeElement
  let selection
  let selRange
  let testRange
  let isCursorAtBeginning
  let isCursorAtTheEnd

  if (window.getSelection) {
    selection = document.getSelection()
    if (selection.rangeCount) {
      selRange = selection.getRangeAt(0)
      testRange = selRange.cloneRange()

      testRange.selectNodeContents(selectedElement)
      testRange.setEnd(selRange.startContainer, selRange.startOffset)
      isCursorAtBeginning = (testRange.toString() == '')

      testRange.selectNodeContents(selectedElement)
      testRange.setStart(selRange.endContainer, selRange.endOffset)
      isCursorAtTheEnd = (testRange.toString() == '')
    }
  } else if (document.selection && document.selection.type != 'Control') {
    selection = document.selection
    selRange = selection.createRange()
    testRange = selRange.duplicate()

    testRange.moveToElementText(selectedElement)
    testRange.setEndPoint('EndToStart', selRange)
    isCursorAtBeginning = (testRange.text == '')

    testRange.moveToElementText(selectedElement)
    testRange.setEndPoint('StartToEnd', selRange)
    isCursorAtTheEnd = (testRange.text == '')
  }

  return {
    selection,
    selectedElement,
    isCursorAtBeginning,
    isCursorAtTheEnd,
  }
}

/**
 * Return previous, current and next range with the content selected inside
 * @param {object} element parent element of the range
 * @param {object} range range to split
 */
export function splitRange(element, range) {
  let prevRange, nextRange

  if (element && element.childNodes.length > 0) {
    prevRange = document.createRange()
    prevRange.setStartBefore(element.firstChild)
    prevRange.setEnd(range.startContainer, range.startOffset)
  
    nextRange = document.createRange()
    nextRange.setStart(range.endContainer, range.endOffset)
    nextRange.setEndAfter(element.lastChild)
  }

  return {
    prevRange,
    currRange: range,
    nextRange,
  }
}

/**
 * Split the current selection getting Prev, current and Next range
 * @param {object} element parent element of the selection
 * @param {object} selection current selection
 */
export function splitSelection(element, selection) {
  if (!selection) {
    selection = document.getSelection()
  }
  if (!element) {
    element = document.activeElement
  }
  
  const currRange = selection.getRangeAt(0)

  return splitRange(element, currRange)
}

/**
 * Split current block based on the current caret position and selection eventually.
 * 1. get the current selection
 * 2. create prev range from start of parent element to start of selection range
 * 3. create next range from end of selection element to end of parent element
 * 4. for both extract the content and put the set of Nodes into two others div elements
 * 5. return the div elements with innerHTML as string of html prev/next selection
 */
export function splitBlock() {
  const { prevRange, nextRange } = splitSelection()
  let prevEl, nextEl

  if (prevRange) {
      const prevContent = prevRange.cloneContents()
      prevEl = document.createElement('div')
      prevEl.prepend(...prevContent.childNodes)
  }

  if (nextRange) {
    const nextContent = nextRange.cloneContents()
    nextEl = document.createElement('div')
    nextEl.prepend(...nextContent.childNodes)
  }

  return {
    prevEl,
    nextEl,
  }
}
