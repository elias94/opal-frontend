import axios from 'axios'

export const getUrl = (url) => process.env.NEXT_PUBLIC_BASE_URL + url

export const fetch = (url) => {
  return axios.get(getUrl(url)).then(res => res.data)
}

export const fetchWithToken = (url, token) => {
  const reqOpt = {
    url: getUrl(url),
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }
  return axios(reqOpt).then(res => res.data)
}

export const postWithToken = (url, token, data={}) => {
  const reqOpt = {
    url: getUrl(url),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data,
  }
  return axios(reqOpt).then(res => res.data)
}

export const deleteWithToken = (url, token, data={}) => {
  const reqOpt = {
    url: getUrl(url),
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    data,
  }
  return axios(reqOpt).then(res => res.data)
}
