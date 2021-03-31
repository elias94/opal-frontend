const URL_R = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i

export function isURL(str) {
  if (typeof str === 'string') {
    return URL_R.test(str)
  }
}

export function decodeHtmlCharCodes(str) {
  return str
    .replace(/(&#(\d+);)/g, (_match, _capture, charCode) => String.fromCharCode(charCode))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, '\'');
}

// https://stackoverflow.com/questions/10687099/how-to-test-if-a-url-string-is-absolute-or-relative
export function isUrlAbsolute(url) {
  if (url.indexOf('//') === 0) {return true;} // URL is protocol-relative (= absolute)
  if (url.indexOf('://') === -1) {return false;} // URL has no protocol (= relative)
  if (url.indexOf('.') === -1) {return false;} // URL does not contain a dot, i.e. no TLD (= relative, possibly REST)
  if (url.indexOf('/') === -1) {return false;} // URL does not contain a single slash (= relative)
  if (url.indexOf(':') > url.indexOf('/')) {return false;} // The first colon comes after the first slash (= relative)
  if (url.indexOf('://') < url.indexOf('.')) {return true;} // Protocol is defined before first dot (= absolute)
  return false; // Anything else must be relative
}

export function extractBaseUrl(url) {
  const match = url.match(/https?:\/{2}[^\/]+/i)

  return match ? match[0] : null
}

export function extractDomainUrl(url) {
  // https://stackoverflow.com/a/8498629/15232490 capturing the www.
  const matches = url.match(/^https?:\/\/(www\.)?([^\/?#]+)(?:[\/?#]|$)/i)

  return matches && matches[2]
}

export const randomChoice = (array) => array[Math.floor(Math.random() * array.length)]
