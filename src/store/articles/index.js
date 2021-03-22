import useSWR from 'swr'
import axios from 'axios'
import {
  getUrl,
  fetch,
  fetchWithToken,
  postWithToken,
} from '../fetchers'

const ROUTE_PATH = '/articles'

export function fetchArticle(articleId) {
  const { data, mutate, error } = useSWR(
    () => articleId ? `${ROUTE_PATH}/${articleId}` : null,
    fetch,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  )

  return {
    article: data,
    loading: !data && !error,
    mutate,
    error,
  }
}

export function updateArticle(articleId, article) {
  const token = localStorage.getItem('access_token')

  const reqOpt = {
    url: getUrl(`${ROUTE_PATH}/${articleId}`),
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data: {
      ...article,
    },
  }

  return axios(reqOpt).then(res => res.data)
}

export function deleteArticle(articleId) {
  const token = localStorage.getItem('access_token')

  const reqOpt = {
    url: getUrl(`${ROUTE_PATH}/${articleId}`),
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }

  return axios(reqOpt).then(res => res.data)
}

export function fetchBlocks(articleId) {
  const { data, mutate, error } = useSWR(
    articleId ? `${ROUTE_PATH}/${articleId}/blocks` : null,
    fetch,
    {
      initialData: null, // [] invalidate the test for `loading`
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  )

  return {
    blocks: data,
    loading: !data && !error,
    mutate,
    error,
  }
}

export function createBlock(articleId, block) {
  const token = localStorage.getItem('access_token')
  const blockPath = `${ROUTE_PATH}/${articleId}/blocks`

  return postWithToken(blockPath, token, { ...block })
}

export function updateBlock(articleId, block) {
  const token = localStorage.getItem('access_token')
  const { id: blockId } = block

  const reqOpt = {
    url: getUrl(`${ROUTE_PATH}/${articleId}/blocks/${blockId}`),
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data: {
      ...block,
    },
  }

  return axios(reqOpt).then(res => res.data)
}

export function deleteBlock(articleId, block) {
  const token = localStorage.getItem('access_token')
  const { id: blockId } = block

  const reqOpt = {
    url: getUrl(`${ROUTE_PATH}/${articleId}/blocks/${blockId}`),
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  }

  return axios(reqOpt).then(res => res.data)
}
