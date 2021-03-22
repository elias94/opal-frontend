import useSWR from 'swr'
import axios from 'axios'
import {
  getUrl,
  fetch,
  fetchWithToken,
  postWithToken,
} from '../fetchers'

const ROUTE_PATH = '/highlights'

export function fetchHighlights(resourceId, userId) {
  const { data, mutate, error } = useSWR(
    () => resourceId ? `${ROUTE_PATH}/resource/${resourceId}/${userId}` : null,
    fetch,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  )

  return {
    highlights: data,
    loading: !data && !error,
    mutate,
    error,
  }
}

export function createHighlight(highlight) {
  const token = localStorage.getItem('access_token')
  const reqPath = `${ROUTE_PATH}/new`

  return postWithToken(reqPath, token, highlight)
}

export function deleteHighlight(highlightId) {
  const token = localStorage.getItem('access_token')

  const reqOpt = {
    url: getUrl(`${ROUTE_PATH}/${highlightId}`),
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }

  return axios(reqOpt).then(res => res.data)
}
