import axios from 'axios'
import useSWR from 'swr'
import {
  getUrl,
  fetch,
  fetchWithToken,
  postWithToken,
} from '../fetchers'

export function loginUser(username, password) {
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)
  
  const reqOpt = {
    url: getUrl('/auth'),
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: formData,
  }

  return axios(reqOpt).then(res => res.data)
}

export function signupUser(username, email, password) {
  const reqOpt = {
    url: getUrl('/users/new'),
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
      name: username,
      email,
      password,
    },
  }

  return axios(reqOpt).then(res => res.data)
}

export function fetchUser() {
  // fetch user information
  // should not retry infinite times if user is not authorized
  // WARNING: localStorage only available client-side
  const { data, mutate, error } = useSWR(() => 
    ['/users/me', localStorage.getItem('access_token')],
    fetchWithToken,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  )

  return {
    user: data,
    loading: !data && !error,
    mutate,
    error,
  }
}

export function onboardUser() {
  const token = localStorage.getItem('access_token')
  const path = '/users/onboard'

  return postWithToken(path, token)
}
