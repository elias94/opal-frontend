import axios from 'axios'

const TWITTER_URL = 'https://publish.twitter.com/oembed'

export function fetchTwitterStatus(statusUrl) {
  const tweetUrl = `${TWITTER_URL}?url=${statusUrl}`
  
  return axios.get(tweetUrl)
}
