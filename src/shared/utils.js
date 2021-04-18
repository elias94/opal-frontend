const URL_R = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i
const TWEET_R = /^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/

export function isURL(str) {
  if (typeof str === 'string') {
    return URL_R.test(str)
  }
  return false
}

export function isTweet(str) {
  if (typeof str === 'string') {
    return TWEET_R.test(str)
  }
  return false
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
  return url.indexOf('http://') === 0 || url.indexOf('https://') === 0

  // if (url.indexOf('//') === 0) {return true;} // URL is protocol-relative (= absolute)
  // if (url.indexOf('://') === -1) {return false;} // URL has no protocol (= relative)
  // if (url.indexOf('.') === -1) {return false;} // URL does not contain a dot, i.e. no TLD (= relative, possibly REST)
  // if (url.indexOf('/') === -1) {return false;} // URL does not contain a single slash (= relative)
  // if (url.indexOf(':') > url.indexOf('/')) {return false;} // The first colon comes after the first slash (= relative)
  // if (url.indexOf('://') < url.indexOf('.')) {return true;} // Protocol is defined before first dot (= absolute)
  // return false; // Anything else must be relative
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

export function partition(array, filter) {
  let pass = [], fail = []
  array.forEach((e, idx, arr) => (filter(e, idx, arr) ? pass : fail).push(e))
  return [pass, fail]
}

export function getArticleTitle(originalTitle) {
  let title = originalTitle

  function wordCount(str) {
    return str.split(/\s+/).length;
  }

  // Split title removing useless part
  if ((/ [\|\-\\\/>»] /).test(title)) {
    title = originalTitle.replace(/(.*)[\|\-\\\/>»] .*/gi, '$1')

    // If the resulting title is too short (3 words or fewer), remove
    // the first part instead:
    if (wordCount(title) < 3) {
      title = originalTitle.replace(/[^\|\-\\\/>»]*[\|\-\\\/>»](.*)/gi, '$1')
    }
  } else if (title.indexOf(': ') !== -1) {
    title = originalTitle.substring(originalTitle.lastIndexOf(':') + 1)

    if (wordCount(title) < 3) {
      title = originalTitle.substring(originalTitle.indexOf(':') + 1)
      // But if we have too many words before the colon there's something weird
      // with the titles and the H tags so let's just use the original title instead
    } else if (wordCount(originalTitle.substr(0, originalTitle.indexOf(':'))) > 5) {
      title = originalTitle
    }
  }

  title = title.trim().replace(/\s{2,}/g, ' ')

  return title
}
