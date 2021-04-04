import useSWR from 'swr'
import {
  postWithToken,
} from '../fetchers'

export function sendFeedback(content) {
  const token = localStorage.getItem('access_token')
  const path = `/feedback`

  return postWithToken(path, token, { content })
}
