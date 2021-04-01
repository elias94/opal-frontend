import { useEffect, useRef } from 'react'

import {
  Container, Status,
} from './styles'

function TweetBlock({ tweetId, editable, content, ...props }) {
  const tweetEl = useRef(null)

  const isTweetLoaded = () => tweetEl.current.hasChildNodes()

  useEffect(() => {
    // componentDidMount
    if (!isTweetLoaded()) {
      loadDynamicTwitterWidget(() => {
        window.twttr.widgets.createTweet(
          tweetId,
          tweetEl.current,
          {} // options
        ).then(() => {
          console.log(`Tweet: ${tweetId} loaded!`)
  
          // Remove the link
          const linkEl = tweetEl.current.querySelector('article > a')
          console.log(linkEl)
        })
        .catch((e) => console.log(e))
      })
    }
  }, [])
  
  return (
    <Container {...props}>
      {editable && <Status>{content}</Status>}
      <div ref={tweetEl} data-twitter className=" w-full mx-auto text-sm text-center text-gray-400"></div>
    </Container>
  )
}

export default TweetBlock

// <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
function loadDynamicTwitterWidget(callback) {
  const scriptIsLoaded = window && window.hasOwnProperty('twttr')

  if (window && !scriptIsLoaded) {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    document.body.appendChild(script)

    script.onload = () => {
      if (typeof callback === 'function') {
        callback()
      }
    }
  }

  if (scriptIsLoaded && typeof callback === 'function') {
    callback()
  }
}
