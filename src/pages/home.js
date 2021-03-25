import { useEffect, useReducer, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTimeout, tagsReducer } from 'shared/hooks'
import { isURL } from 'shared/utils'
import {
  fetchUser,
  fetchUserResources,
  storeExternalResource,
  deleteResource,
  deleteNote,
  onboardUser,
} from 'store'

import HomePage from 'components/templates/HomePage'

const DEFAULT_REFRESH = 20 * 1000

export default function Signup() {
  const router = useRouter()
  const timeout = useTimeout()
  const [tags, dispatchTags] = useReducer(tagsReducer, [])
  const [toast, setToast] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [refreshInterval, setRefreshInterval] = useState(DEFAULT_REFRESH)
  
  const {
    user,
    loading: userLoading,
    mutate: mutateUser,
    error: userError
  } = fetchUser()

  const {
    resources,
    loading: loadingResources,
    mutate: mutateResources,
  } = fetchUserResources(user && user.id, searchValue, tags, refreshInterval)
  
  if (userError) {
    router.push('/')
  }

  // Real time search currently disabled
  // useEffect(() => {
  //   mutateResources()
  // }, [searchValue])

  useEffect(() => {
    if (toast) {
      timeout.set(() => {
        setToast(null)
      }, 3000)
    }

    return () => timeout.clear()
  }, [toast])

  return (
    <div style={{ height: '100vh' }}>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomePage
        user={user}
        resources={resources}
        toast={toast}
        tags={tags}
        importArticle={importArticle}
        searchValue={searchValue}
        onSearchEnter={onSearchEnter}
        onSearchChange={onSearchChange}
        deleteResource={deleteArticle}
        deleteResourceNote={deleteArticleNote}
        onRemoveTag={onRemoveTag}
        onEmptySearchBackspace={onEmptySearchBackspace}
        setOnboard={setOnboard}
      />
    </div>
  )

  function setOnboard() {
    onboardUser()
    .then(() => {
      mutateUser()
    })
    .catch((e) => {
      console.error(e)
    })
  }

  function onEmptySearchBackspace() {
    if (tags.lengt > 0) {
      const last = tags[tags.length - 1]

      dispatchTags({ type: 'REMOVE_LAST' })
      setSearchValue(last)
    }
  }

  function onRemoveTag(tag) {
    dispatchTags({ type: 'REMOVE', payload: tag })
  }

  function onSearchEnter(value) {
    const trimmedValue = value.trim()

    if (isURL(trimmedValue)) {
      // Clear search input
      importArticle(trimmedValue)
      setSearchValue('')
    } else if (trimmedValue.length > 1) {
      // Remove all spaces
      const clean = trimmedValue.replace(/\s+/g, '')

      dispatchTags({ type: 'ADD', payload: clean })
      setSearchValue('')
    }
  }

  function onSearchChange(value) {
    setSearchValue(value)
  }

  function deleteArticleNote(resourceId) {
    deleteNote(resourceId)
    .then(() => {
      mutateResources()
    })
    .catch((e) => {
      console.error(e)
    })
  }

  function deleteArticle(resourceId) {
    deleteResource(resourceId)
    .then(() => {
      mutateResources()
    })
    .catch((e) => {
      console.error(e)
    })
  }

  function importArticle(url) {
    storeExternalResource(url)
    .then(() => {
      //... start polling the articles
      setToast('Article added to queue')
      setRefreshInterval(1500)

      setTimeout(() => {
        setRefreshInterval(DEFAULT_REFRESH)
      }, 10 * 1000)
    })
    .catch((e) => {
      console.error(e.status)
    })
  }
}
