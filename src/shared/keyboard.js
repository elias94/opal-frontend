export default function KeyEvent(evt) {
  const { key, keyCode } = evt

  const isShiftPressed = evt.shiftKey
  const isTab = keyCode === 9
  const isBackspace = keyCode === 8
  const isEnter = keyCode === 13
  const isShift = keyCode === 16
  const isEsc = keyCode === 27
  const isSpace = keyCode === 32
  const isArrowUp = keyCode === 38
  const isArrowDown = keyCode === 40
  const isSlash = keyCode === 191
  const isBackslash = keyCode === 220
  const isNumeric = keyCode > 47 && keyCode < 58
  const isNumpad = keyCode > 95 && keyCode < 106
  const isNumber = isNumpad || isNumeric
  const isChar = keyCode > 64 && keyCode < 91
  const isFunction = keyCode > 111 && keyCode < 124
  const isPrintable = key.length === 1

  const getNumber = () => {
    if (isNumeric) {
      return keyCode - 48
    } else if (isNumpad) {
      return keyCode - 96
    } 
    return null
  }

  return {
    ...evt,
    isShiftPressed,
    isShift,
    isTab,
    isEsc,
    isSpace,
    isBackspace,
    isBackslash,
    isArrowUp,
    isArrowDown,
    isSlash,
    isEnter,
    isNumeric,
    isNumpad,
    isNumber,
    isChar,
    isFunction,
    isPrintable,
    getNumber,
  }
}
