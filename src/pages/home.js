import { useEffect, useReducer, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTimeout, tagsReducer } from 'shared/hooks'
import { isURL, isTweet } from 'shared/utils'

import {
  fetchUser,
  fetchUserResources,
  storeExternalResource,
  deleteResource,
  deleteNote,
  onboardUser,
  hideResource,
  saveTweet,
  sendFeedback,
} from 'store'

import HomePage from 'components/templates/HomePage'

/**
 * CONSTANTS
 */
const DEFAULT_REFRESH = 20 * 1000   // Default refresh rate for resources list
const PAGE_SIZE = 30                // Initial sizes of a page of resources
const DEFAULT_LIST_LENGTH = 12      // Default resources list length

export default function Signup() {
  const router = useRouter()
  const timeout = useTimeout()

  // Paging parameters
  const [skipPaging, setSkipPaging] = useState(0)
  const [sizePaging, setSizePaging] = useState(PAGE_SIZE)
  // Toast message on homepage  
  const [toast, setToast] = useState(null)
  // Applied on the tags
  const [tags, dispatchTags] = useReducer(tagsReducer, [])
  const [searchValue, setSearchValue] = useState('')
  // Refresh interval for the resources list
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
  } = fetchUserResources(
    user && user.id,
    refreshInterval,
    searchValue,
    tags,
    skipPaging,
    sizePaging,
  )
  
  if (userError) {
    router.push('/')
  }

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
        skipPaging={skipPaging}
        displayListLength={DEFAULT_LIST_LENGTH}
        loadingResources={loadingResources}
        importArticle={importArticle}
        searchValue={searchValue}
        onSearchEnter={onSearchEnter}
        onSearchChange={onSearchChange}
        deleteResource={deleteArticle}
        deleteResourceNote={deleteArticleNote}
        onRemoveTag={onRemoveTag}
        onEmptySearchBackspace={onEmptySearchBackspace}
        setOnboard={setOnboard}
        hideResource={hideSavedArticle}
        updatePaging={updatePaging}
        resetPaging={resetPaging}
        sendFeedback={sendUserFeedback}
      />
    </div>
  )

  function sendUserFeedback(message) {
    sendFeedback(message)
    .then(() => {
      console.log('Feedback sent!')
    })
    .catch((e) => {
      console.error(e)
    })
  }

  function resetPaging() {
    setSkipPaging(0)
  }

  function updatePaging(skipDir=1) {
    if (skipDir == -1 && skipPaging > 0) {
      setSkipPaging(skipPaging - PAGE_SIZE)
    } else {
      setSkipPaging(skipPaging + PAGE_SIZE)
    }
  }

  function hideSavedArticle(resourceId, hidden=true) {
    hideResource(resourceId, hidden)
    .then(() => {
      mutateResources()
    })
    .catch((e) => {
      console.error(e)
    })
  }

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
    if (tags.length > 0) {
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
    const isLinkTweet = isTweet(url)

    if (isLinkTweet) {
      saveTweet(url)
      .then(() => {
        //... start polling the articles
        setToast('Tweet added to queue. Page will reload automatically...')
        setRefreshInterval(1500)
  
        setTimeout(() => {
          setRefreshInterval(DEFAULT_REFRESH)
        }, 10 * 1000)
      })
      .catch((e) => {
        console.error(e.status)
      })
    } else {
      storeExternalResource(url)
      .then(() => {
        //... start polling the articles
        setToast('Article added to queue. Page will reload automatically...')
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
}
