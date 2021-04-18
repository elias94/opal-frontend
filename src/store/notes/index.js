import useSWR from 'swr'
import {
  fetch,
  fetchWithToken,
  postWithToken,
  deleteWithToken,
} from '../fetchers'

const ROUTE_PATH = '/notes'


export function fetchNoteArticle(noteId) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null

  const { data, mutate, error } = useSWR(
    () => noteId ? [`${ROUTE_PATH}/${noteId}`, token] : null,
    fetchWithToken,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  )

  return {
    data,
    loading: !data && !error,
    mutate,
    error,
  }
}

export function createNote(title, resourceId=null) {
  let reqPath = ROUTE_PATH + '/new'
  
  // A note doesn't need to be connected to an article
  if (resourceId) {
    reqPath = reqPath + '?resource_id=' + resourceId
  }

  const token = localStorage.getItem('access_token')

  console.log(reqPath)
  return postWithToken(reqPath, token, { title })
}

export function setNotePrivate(noteId, isPrivate=false) {
  const token = localStorage.getItem('access_token')
  const blockPath = `${ROUTE_PATH}/${noteId}/set`

  return postWithToken(blockPath, token, { private: isPrivate })
}

export function deleteNote(noteId) {
  const token = localStorage.getItem('access_token')
  const blockPath = `${ROUTE_PATH}/${noteId}`

  return deleteWithToken(blockPath, token)
}
