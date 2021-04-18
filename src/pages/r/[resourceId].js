import { useEffect, useState, useReducer } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getArticleTitle, isURL } from 'shared/utils'
import { tagsReducer } from 'shared/hooks'
import {
  fetchUser,
  fetchResource,
  fetchResources,
  fetchBlocks,
  saveResource,
  createNote,
  createBlock,
  updateBlock,
  deleteBlock,
  fetchHighlights,
  createHighlight,
  deleteHighlight,
  updateArticle,
  deleteArticle,
  fetcArticleNotes,
  fetchResourceMentions,
  fetcArticleTags,
  saveTag,
  deleteTag,
  setNotePrivate,
  saveVote,
  deleteNote,
  fetchUserResourcesLite,
  sendFeedback,
} from 'store'

import ResourcePage from 'components/templates/ResourcePage'
import { PAGE_SIZE } from '../home'


function Resource() {
  const router = useRouter()
  const [isSingleArticle, setIsSingleArticle] = useState(true)
  const [tagInputError, setTagInputError] = useState(null)
  const [isInputTagActive, setIsInputTagActive] = useState(false)
  const [pageTitle, setPageTitle] = useState('')

  // Extract query parameters from url
  // `/r/{resource_id}?active={resource_id}&resources={resource_id}`
  const { resourceId, resources, editable } = router.query

  //
  // User - current
  //
  const { user, loading: userLoading, error: userError } = fetchUser() 

  //
  // Resource
  //
  const {
    resource,
    mutate: mutateResource,
    loading: loadingResource,
    error: resourceError,
  } = fetchResource(resourceId)

  //
  // Blocks
  //
  const { blocks, loading: loadingBlocks } = fetchBlocks(getArticleId(resource))

  //
  // Other resources
  //
  const {
    resourcesData,
    loading: resourcesLoading,
    errors: resourcesErrors,
  } = fetchResources(resources)

  //
  // Resource notes
  //
  const {
    notes: articleNotes,
    mutate: mutateArticleNotes,
  } = fetcArticleNotes(resourceId ? resourceId : null)

  //
  // Resource mentions
  //
  const { mentions } = fetchResourceMentions(resourceId ? resourceId : null)

  //
  // Resource tags
  //
  const {
    tags,
    mutate: mutateTags,
    error: tagsError,
  } = fetcArticleTags(resourceId ? resourceId : null)

  //
  // Resource highlights
  //
  const {
    highlights: noteHighlights,
  } = fetchHighlights(resourceId, user && user.id)

  // Paging parameters
  const [skipPaging, setSkipPaging] = useState(0)
  const [sizePaging, setSizePaging] = useState(PAGE_SIZE)
  // Applied on the tags
  const [searchTags, dispatchTags] = useReducer(tagsReducer, [])
  const [searchValue, setSearchValue] = useState('')
  const [resourcesType, setResourcesType] = useState('external')  // 'external' or 'note'

  //
  // Resources Menu List
  //
  const {
    resources: resourcesInfoList,
    loading: loadingResourcesInfoList,
    mutate: mutateResourcesInfoList,
  } = fetchUserResourcesLite(
    user && user.id,
    searchValue,
    searchTags,
    resourcesType,
    skipPaging,
    sizePaging,
  )

  useEffect(() => {
    if (typeof resource === 'object' && Object.keys(resource).length > 0) {
      const { content } = resource

      setPageTitle(content.title)
    }
  }, [resource])

  useEffect(() => {
    if (typeof window !== 'undefined' && resourceError) {
      // Resource error client-side is not acceptable
      router.push('/home')
    }
  }, [resourceError])

  useEffect(() => {
    const hasResources = typeof resources !== 'undefined'
    setIsSingleArticle(resourceId && !hasResources)
  }, [resourceId, resources])

  useEffect(() => {
    // Prevent backspace shortcut for navigate back
    window.onkeydown = (e) => {
      if (e.keyCode == 8 && e.target == document.body) {
        e.preventDefault()
      }
    }
  }, [])

  return (
    <div style={{ height: '100vh' }}>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} - {pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ResourcePage
        resourceId={resourceId}
        resources={resources}
        user={user}
        resource={resource}
        editable={editable}
        loadingResource={loadingResource}
        blocks={blocks}
        loadingBlocks={loadingBlocks}
        tags={tags}
        mentions={mentions}
        isSingleArticle={isSingleArticle}
        articleNotes={articleNotes}
        noteHighlights={noteHighlights}
        onArticleStarClick={onArticleStarClick}
        onAddNoteClick={onAddNoteClick}
        createBlock={createNoteBlock}
        updateBlock={updateNoteBlock}
        deleteBlock={deleteNoteBlock}
        createNoteHighlight={createNoteHighlight}
        deleteNoteHighlight={deleteNoteHighlight}
        updateArticle={updateNoteArticle}
        deleteArticle={deleteNoteArticle}
        saveTag={saveArticleTag}
        deleteTag={deleteArticleTag}
        tagInputError={tagInputError}
        setNotePrivate={setArticleNotePrivate}
        saveUserVote={saveUserVote}
        deleteNote={deleteArticleNote}
        setTagInputError={setTagInputError}
        isInputTagActive={isInputTagActive}
        setIsInputTagActive={setIsInputTagActive}
        resourcesInfoList={resourcesInfoList}
        searchTags={searchTags}
        searchValue={searchValue}
        onSearchEnter={onSearchEnter}
        onSearchChange={onSearchChange}
        onRemoveTag={onRemoveTag}
        onEmptySearchBackspace={onEmptySearchBackspace}
        resourcesType={resourcesType}
        selectResourceType={selectResourceType}
        openResource={openResource}
        resourcesData={resourcesData}
        closeResource={closeResource}
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

  function closeResource(resourceId) {
    const { resources } = router.query
    
    if (Array.isArray(resources)) {
      let localResources = resources

      const index = localResources.indexOf(resourceId)

      if (index > -1) {
        localResources.splice(index, 1)
      }

      router.query.resources = localResources
    } else {
      delete router.query.resources
    }

    router.push(router)
  }

  function openResource(resourceId) {
    const { resources } = router.query

    if (Array.isArray(resources)) {
      if (resources.indexOf(resourceId) > -1) {
        return
      }

      router.query.resources = resources.concat([resourceId])
    } else if (resources) {
      if (resources === resourceId) {
        return
      }
      router.query.resources = [resources, resourceId]
    } else {
      router.query.resources = resourceId
    }

    router.push(router)
  }

  function selectResourceType(type) {
    setResourcesType(type)
  }

  function onEmptySearchBackspace() {
    if (searchTags.length > 0) {
      const last = searchTags[searchTags.length - 1]

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

  function deleteArticleNote() {
    const noteId = getNoteId(resource)

    deleteNote(noteId)
    .then(() => {
      mutateResource()
    })
    .catch((e) => {
      console.error(e)
    })
  }

  function saveUserVote(vote) {
    saveVote(resourceId, vote)
    .then(() => {
      mutateResource()
    })
    .catch((e) => {
      console.error(e.status)
    })
  }

  function onAddNoteClick() {
    const article = resource.content
    const { display_name } = user
    const { title } = article
    // Article Title - Username's note
    const noteTitle = `${display_name}'s Note - ${getArticleTitle(title)}`

    createNote(noteTitle, resourceId)
    .then(({ note, article, resource_id }) => {
      // Shallow routing adding a parameter for the new note.
      // WARNING: If the user add a query parameter on his own?
      // see: https://nextjs.org/docs/routing/shallow-routing
      const hasResources = typeof resources !== 'undefined'
      let routeParam = '/r/' + resource_id + '?editable="true"&resources=' + resourceId
      
      if (hasResources) {
        routeParam += '&' + resources.map(res => 'resources=' + res).join('&')
      }
      
      router.push(routeParam, undefined, { shallow: true })
    })
    .catch((e) => {
      console.error(e.status)
    })
  }

  function onArticleStarClick() {
    const { saved } = resource
    const isSaved = !!saved

    saveResource(user.id, resourceId, !isSaved)
    .then(() => {
      mutateResource()
    })
    .catch((e) => {
      console.error(e.status)
    })
  }

  function createNoteBlock(newBlock) {
    const articleId = getArticleId(resource)

    createBlock(articleId, newBlock)
    .catch((e) => {
      console.error(e.status)
    })
  }

  function updateNoteBlock(updatedBlock) {
    const articleId = getArticleId(resource)

    updateBlock(articleId, updatedBlock)
    .catch((e) => {
      console.error(e.status)
    })
  }

  function deleteNoteBlock(deletedBlock) {
    const articleId = getArticleId(resource)

    deleteBlock(articleId, deletedBlock)
    .catch((e) => {
      console.error(e.status)
    })
  }

  function createNoteHighlight(highlight) {
    createHighlight(highlight)
    .catch((e) => {
      console.error(e.status)
    })
  }

  function deleteNoteHighlight(highlightId) {
    deleteHighlight(highlightId)
    .catch((e) => {
      console.error(e.status)
    })
  }

  function updateNoteArticle(articleId, article) {
    mutateResource()
    updateArticle(articleId, article)
    .then((a) => {
      console.log(a)
    })
    .catch((e) => {
      console.error(e.status)
    })
  }

  function deleteNoteArticle(articleId) {
    deleteArticle(articleId)
    .then((a) => {
      console.log(a)
    })
    .catch((e) => {
      console.error(e.status)
    })
  }

  function saveArticleTag(tagName) {
    if (tagName.length < 2) {
      setTagInputError('Tag is too short')
      return
    }

    if (tagName.length > 50) {
      setTagInputError('Tag is too long')
      return
    }

    saveTag(resourceId, tagName)
    .then((a) => {
      mutateTags()
      setTagInputError(null)
    })
    .catch((e) => {
      console.error(e)
      try {
        setTagInputError(e.response.data.detail)
      } catch {
        setTagInputError('Error processing tag, retry.')
      }
    })
  }

  function deleteArticleTag(tagName) {
    deleteTag(resourceId, tagName)
    .then((a) => {
      mutateTags()
    })
    .catch((e) => {
      console.error(e.status)
    })
  }

  function setArticleNotePrivate(isPrivate=false) {
    const noteId = getNoteId(resource)

    setNotePrivate(noteId, isPrivate)
    .then((n) => {
      mutateResource()
    })
    .catch((e) => {
      console.error(e)
    })
  }
}

export default Resource

function getArticleId(resource) {
  const { content } = resource

  if (!content) {
    return null
  }

  return content.id
}

function getNoteId(resource) {
  return resource.resource.id
}
