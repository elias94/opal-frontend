import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { getArticleTitle } from 'shared/utils'
import {
  fetchUser,
  fetchResource,
  fetchBlocks,
  saveResource,
  createNote,
  fetchNoteArticle,
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
} from 'store'

import ResourcePage from 'components/templates/ResourcePage'


function Resource() {
  const router = useRouter()
  const [isSingleArticle, setIsSingleArticle] = useState(true)
  const [tagInputError, setTagInputError] = useState(null)
  const [isInputTagActive, setIsInputTagActive] = useState(false)
  const [pageTitle, setPageTitle] = useState('')

  // Extract query parameters from url
  const { resourceId, note: noteId } = router.query

  //
  // Resource
  //
  const { user, loading: userLoading, error: userError } = fetchUser() 

  const {
    resource,
    mutate: mutateResource,
    loading: loadingResource,
    error: resourceError,
  } = fetchResource(resourceId)

  const { blocks } = fetchBlocks(getArticleId(resource))

  //
  // Resource extra
  //
  const {
    notes: articleNotes,
    mutate: mutateArticleNotes,
  } = fetcArticleNotes(resourceId ? resourceId : null)

  const { mentions } = fetchResourceMentions(resourceId ? resourceId : null)

  const {
    tags,
    mutate: mutateTags,
    error: tagsError
  } = fetcArticleTags(resourceId ? resourceId : null)

  //
  // Note
  //
  const {
    data: noteArticleData,
    mutate: mutateNoteArticle,
    error: noteArticleError,
  } = fetchNoteArticle(noteId)

  const {
    blocks: noteBlocks,
    loading: loadingNoteBlocks,
  } = fetchBlocks(noteArticleData ? noteArticleData.article.id : null)

  const {
    highlights: noteHighlights,
  } = fetchHighlights(resourceId, user && user.id)

  useEffect(() => {
    if (typeof resource === 'object' && Object.keys(resource).length > 0) {
      const { content } = resource

      setPageTitle(content.title)
    }
  }, [resource])

  useEffect(() => {
    if (noteArticleError) {
      // Reset query param in case of error
      // const routeParam = `/r/${resourceId}`
      // router.push(routeParam, undefined, { shallow: true })
      console.log(noteArticleError)
    }
  }, [noteArticleError])

  useEffect(() => {
    if (typeof window !== 'undefined' && resourceError) {
      // Resource error client-side is not acceptable
      router.push('/home')
    }
  }, [resourceError])

  useEffect(() => {
    if (!noteId, resourceId) {
      mutateArticleNotes()
    }
    setIsSingleArticle(resourceId && !noteId)
  }, [resourceId, noteId])

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
        noteId={noteId}
        user={user}
        resource={resource}
        loadingResource={loadingResource}
        blocks={blocks}
        tags={tags}
        mentions={mentions}
        isSingleArticle={isSingleArticle}
        articleNotes={articleNotes}
        note={noteArticleData && noteArticleData.note}
        noteArticle={noteArticleData && noteArticleData.article}
        noteBlocks={noteBlocks}
        noteHighlights={noteHighlights}
        loadingNoteBlocks={loadingNoteBlocks}
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
      />
    </div>
  )

  function deleteArticleNote() {
    deleteNote(noteId)
    .then(() => {
      mutateResources()
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

    createNote(resourceId, noteTitle)
    .then(({ note }) => {
      // Shallow routing adding a parameter for the new note.
      // WARNING: If the user add a query parameter on his own?
      // see: https://nextjs.org/docs/routing/shallow-routing
      const routeParam = `/r/${resourceId}?note=${note.id}`
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
    const articleId = noteArticleData.article.id

    createBlock(articleId, newBlock)
    .catch((e) => {
      console.error(e.status)
    })
  }

  function updateNoteBlock(updatedBlock) {
    const articleId = noteArticleData.article.id

    updateBlock(articleId, updatedBlock)
    .catch((e) => {
      console.error(e.status)
    })
  }

  function deleteNoteBlock(deletedBlock) {
    const articleId = noteArticleData.article.id

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
    mutateNoteArticle()
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
    setNotePrivate(noteId, isPrivate)
    .then((n) => {
      mutateNoteArticle()
    })
    .catch((e) => {
      console.error(e.status)
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
