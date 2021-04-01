import axios from 'axios'
import useSWR from 'swr'
import {
  getUrl,
  fetch,
  fetchWithToken,
  postWithToken,
  deleteWithToken,
} from '../fetchers'

import { isServer } from '../index'

const ROUTE_PATH = '/resources'

export function fetchResource(resourceId) {
  let token = null

  if (!isServer) {
    token = localStorage.getItem('access_token')
  }

  const { data, mutate, error } = useSWR(
    () => resourceId ? [`${ROUTE_PATH}/${resourceId}`, token] : null,
    fetchWithToken,
    {
      initialData: [],
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  )

  return {
    resource: data,
    loading: (!data || data.length === 0) && !error,
    mutate,
    error,
  }
}

export function fetchResourceWithExcerpt(resourceId) {
  const { data, mutate, error } = useSWR(
    () => resourceId ? [
      `${ROUTE_PATH}/${resourceId}/article`,
      localStorage.getItem('access_token')
    ] : null,
    fetchWithToken,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  )

  return {
    articleWithExcerpt: data,
    loading: !data && !error,
    mutate,
    error,
  }
}

export function fetchResourceMentions(resourceId) {
  const { data, mutate, error } = useSWR(
    () => resourceId ? `${ROUTE_PATH}/${resourceId}/mentions` : null,
    fetchWithToken,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  )

  return {
    mentions: data,
    loading: !data && !error,
    mutate,
    error,
  }
}

export function fetchUserResources(
  userId,
  refreshInterval,
  searchValue,
  tags,
  skip=null,
  limit=40,
) {
  const base = ROUTE_PATH + '/user/' + userId + '?'
  const qp = [] // query params

  if (searchValue.length > 1) {
    qp.push('match=' + searchValue)
  }

  if (tags.length > 0) {
    qp.push(tags.map(tag => 'tags=' + tag))
  }

  if (skip) {
    qp.push(`skip=${skip}`)
  }

  if (limit) {
    qp.push(`limit=${limit}`)
  }

  const path = base + qp.join('&')

  const { data, mutate, error } = useSWR(() => 
    [userId && path, localStorage.getItem('access_token')],
    fetchWithToken,
    {
      shouldRetryOnError: true,
      revalidateOnFocus: false,
      refreshInterval,
    }
  )

  return {
    resources: data,
    loading: !data && !error,
    mutate,
    error,
  }
}

export function fetcArticleNotes(resourceId) {
  const { data, mutate, error } = useSWR(() =>
    resourceId ? [
      `${ROUTE_PATH}/${resourceId}/notes`,
      localStorage.getItem('access_token'),
    ] : null,
    fetchWithToken,
    {
      initialData: [],
      shouldRetryOnError: true,
      revalidateOnFocus: false,
    }
  )

  return {
    notes: data,
    loading: (!data || data.length === 0) && !error,
    mutate,
    error,
  }
}

export function storeExternalResource(url) {
  if (typeof url === 'string') {
    const encoded_url = encodeURIComponent(url)
    const token = localStorage.getItem('access_token')

    const reqPath = `${ROUTE_PATH}/externals/new?url=${encoded_url}`

    return postWithToken(reqPath, token)
  }
}

export function saveResource(userId, resourceId, save=true) {
  if (typeof userId === 'string' && typeof resourceId === 'string') {
    const token = localStorage.getItem('access_token')

    const reqPath = `${ROUTE_PATH}/${resourceId}/save?delete=${!save}`

    return postWithToken(reqPath, token)
  }
}

export function deleteResource(resourceId) {
  if (typeof resourceId === 'string') {
    const token = localStorage.getItem('access_token')
    const reqPath = `${ROUTE_PATH}/${resourceId}`

    return deleteWithToken(reqPath, token)
  }
}

export function createNote(resourceId, title) {
  if (typeof resourceId === 'string') {
    const token = localStorage.getItem('access_token')
    const reqPath = `${ROUTE_PATH}/${resourceId}/notes/new`

    return postWithToken(reqPath, token, { title })
  }
}

export function fetcArticleTags(resourceId) {
  const { data, mutate, error } = useSWR(
    () => resourceId ? [
      `${ROUTE_PATH}/${resourceId}/tags`,
      localStorage.getItem('access_token')
    ] : null,
    fetchWithToken,
    {
      shouldRetryOnError: true,
      revalidateOnFocus: false,
    }
  )

  return {
    tags: data || [],
    loading: (!data || data.length === 0) && !error,
    mutate,
    error,
  }
}

export function saveTag(resourceId, tagName) {
  const token = localStorage.getItem('access_token')
  const reqPath = `${ROUTE_PATH}/${resourceId}/tags/new`

  return postWithToken(reqPath, token, { name: tagName })
}

export function deleteTag(resourceId, tagName) {
  const token = localStorage.getItem('access_token')
  const reqPath = `${ROUTE_PATH}/${resourceId}/tags`

  return deleteWithToken(reqPath, token, { name: tagName })
}

export function hideResource(resourceId, hidden=true) {
  const token = localStorage.getItem('access_token')
  const reqPath = `${ROUTE_PATH}/${resourceId}/hide-saved?hidden=${hidden}`

  return postWithToken(reqPath, token)
}

export function saveVote(resourceId, vote=true) {
  const token = localStorage.getItem('access_token')
  let reqPath

  if (vote) {
    reqPath = `${ROUTE_PATH}/${resourceId}/vote`
  } else {
    reqPath = `${ROUTE_PATH}/${resourceId}/vote?unvote=${true}`
  }
  
  return postWithToken(reqPath, token)
}

export function saveTweet(tweetUrl) {
  const token = localStorage.getItem('access_token')
  const reqPath = `${ROUTE_PATH}/externals/tweet?tweet_url=${tweetUrl}`

  return postWithToken(reqPath, token)
}
