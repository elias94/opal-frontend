import { useEffect, useRef } from 'react'

import {
  Container, Status,
} from './styles'

function TweetBlock({ tweetId, editable, content }) {
  const tweetEl = useRef(null)

  useEffect(() => {
    // componentDidMount
    loadDynamicTwitterWidget(() => {
      window.twttr.widgets.createTweet(
        tweetId,
        tweetEl.current,
        {} // options
      ).then(() => console.log(`Tweet: ${tweetId} loaded!`))
    })
  }, [])
  
  return (
    <Container>
      {editable && <Status>{content}</Status>}
      <div ref={tweetEl} data-twitter></div>
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
