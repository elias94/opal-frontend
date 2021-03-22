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
