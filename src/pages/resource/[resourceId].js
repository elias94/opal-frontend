import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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
} from 'store'

import ResourcePage from 'components/templates/ResourcePage'


function Resource() {
  const router = useRouter()
  const [isSingleArticle, setIsSingleArticle] = useState(true)
  const [tagInputError, setTagInputError] = useState(null)
  const [isInputTagActive, setIsInputTagActive] = useState(false)

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
    if (noteArticleError) {
      // Reset query param in case of error
      // const routeParam = `/resource/${resourceId}`
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
  }, [resourceId, noteId])

  useEffect(() => {
    setIsSingleArticle(resourceId && !noteId)
  }, [resourceId, noteId])

  return (
    <ResourcePage
      resourceId={resourceId}
      noteId={noteId}
      user={user}
      resource={resource}
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
      isInputTagActive={isInputTagActive}
      tagInputError={tagInputError}
      onAddTagClick={onAddTagClick}
      onTagInputCancel={onTagInputCancel}
      setNotePrivate={setArticleNotePrivate}
    />
  )

  function onAddNoteClick() {
    const [, article] = resource.content
    const { display_name } = user
    const { title } = article
    // Article Title - Username's note
    const noteTitle = `${title} - ${display_name}'s Note`

    createNote(resourceId, noteTitle)
    .then(({ note }) => {
      // Shallow routing adding a parameter for the new note.
      // WARNING: If the user add a query parameter on his own?
      // see: https://nextjs.org/docs/routing/shallow-routing
      const routeParam = `/resource/${resourceId}?note=${note.id}`
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
    .then((block) => {
      console.log(block)
    })
    .catch((e) => {
      console.error(e.status)
    })
  }

  function updateNoteBlock(updatedBlock) {
    const articleId = noteArticleData.article.id

    updateBlock(articleId, updatedBlock)
    .then((block) => {
      console.log(block)
    })
    .catch((e) => {
      console.error(e.status)
    })
  }

  function deleteNoteBlock(deletedBlock) {
    const articleId = noteArticleData.article.id

    deleteBlock(articleId, deletedBlock)
    .then((block) => {
      console.log(block)
    })
    .catch((e) => {
      console.error(e.status)
    })
  }

  function createNoteHighlight(highlight) {
    createHighlight(highlight)
    .then((h) => {
      console.log(h)
    })
    .catch((e) => {
      console.error(e.status)
    })
  }

  function deleteNoteHighlight(highlightId) {
    deleteHighlight(highlightId)
    .then((h) => {
      console.log(h)
    })
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

  function onAddTagClick() {
    setIsInputTagActive(true)
  }

  function onTagInputCancel() {
    setIsInputTagActive(false)
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
      setIsInputTagActive(false)
      setTagInputError(null)
    })
    .catch((e) => {
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

  if (!content || content.length < 1) {
    return null
  }

  const [, article] = content

  return article.id
}
