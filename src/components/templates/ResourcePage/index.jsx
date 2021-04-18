import { useEffect, useReducer, useState, useCallback, useMemo } from 'react'
import isEqual from 'fast-deep-equal'
import { blocksReducer } from 'shared/hooks'
import {
  generateInternalQuoteBlock,
  generateInternalHighlight,
} from 'shared/libs/block'

import ArticleViewer from 'components/organisms/ArticleViewer'
import ArticleMenu from 'components/organisms/ArticleMenu'
import NoteEditor from 'components/organisms/NoteEditor'
import NavbarViewerMultiple from 'components/molecules/NavbarViewerMultiple'
import TweetViewer from 'components/organisms/TweetViewer'
import LoadingOverlay from 'components/atoms/LoadingOverlay'
import ExplorerResources from 'components/organisms/ExplorerResources'
import ArticleViewerLite from 'components/organisms/ArticleViewerLite'


import { Container, Content, ContainerContent } from './styles'

function ResourcePage(props) {
  const [highlightTextMode, setHighlightTextMode] = useState(false)
  const [isNoteEditable, setNoteEditable] = useState(false)
  const [isEditingMode, setEditingMode] = useState(false)
  const [articleMenuOpen, setArticleMenuOpen] = useState(false)
  const [explorerOpen, setExplorerOpen] = useState(false)
  const [isNote, setIsNote] = useState(false)
  const [baseUrl, setBaseUrl] = useState('')

  // Reducer for client-side blocks management
  const [
    { blocks, params, lastAction },
    blocksDispatch,
  ] = useReducer(blocksReducer, null, initReducer)

  useEffect(() => {
    // Update the blocks list ONLY when has been updated server-side
    if (!props.loadingBlocks && Array.isArray(props.blocks) && blocks.length === 0)
    {
      if (checkIfNote(props) && blocks.length === 0 && props.blocks.length === 0) {
        const { content: article } = props.resource

        blocksDispatch({ type: 'ADD_NEW', extra: article })
      } else if (!isEqual(props.blocks, blocks)) {
        // Setup client-side list cloning the serverSide
        blocksDispatch({ type: 'INIT', payload: props.blocks })
      }
    }
  }, [props.blocks, blocks, props.loadingBlocks, props.user, props.resource])

  useEffect(() => {
    if (checkIfNote(props)) {
      // Only notes are editable
      const { id: userId } = props.user
      const { author } =  props.resource.content
  
      setNoteEditable(userId === author)
      setIsNote(true)
    } else {
      setIsNote(false)
    }
  }, [props.user, props.resource])

  useEffect(() => {
    if (props.resource && props.resource.content) {
      setBaseUrl(props.resource.resource.url)
    }
  }, [props.resource])

  useEffect(() => {
    setEditingMode(props.editable)
  }, [props.editable])

  const openExplorerResources = useCallback(() => {
    setExplorerOpen(!explorerOpen)
    setArticleMenuOpen(false)
  }, [explorerOpen])

  const openArticleMenu = useCallback(() => {
    setArticleMenuOpen(!articleMenuOpen)
    setExplorerOpen(false)
  }, [articleMenuOpen])

  const onViewNoteClick = useCallback(() => {
    setEditingMode(!isEditingMode)
  }, [isEditingMode])

  const onQuoteBlockClick = useCallback((sourceBlock) => {
    const intQuoteBlock = generateInternalQuoteBlock(sourceBlock, blocks, props.resourceId)

    let lastBlock = null

    if (blocks.length > 0) {
      lastBlock = blocks[blocks.length - 1]
    }

    blocksDispatch({ type: 'APPEND', payload: intQuoteBlock })
  }, [blocks, props.resourceId])

  const onAddHighlightClick = useCallback((highlight) => {
    const intHighlightBlock = generateInternalHighlight(
      highlight,
      blocks,
      props.resourceId
    )

    blocksDispatch({ type: 'APPEND', payload: intHighlightBlock })
  }, [blocks, props.resourceId])

  const getOtherResourcesViews = useMemo(() => {
    const { resourcesData } = props

    function resourceView(resource) {
      const { data, key } = resource
      const { type, resource: ext } = data

      if (type === 'external_resource' && ext.type === 'tweet') {
        return  <TweetViewer resource={data} />
      } else {
        return (
          <ArticleViewerLite
            key={`Resource_${key}`}
            resource={data}
            isSingleArticle={false}
            onQuoteBlockClick={onQuoteBlockClick}
            copyBlockLinkToClipboard={copyBlockLinkToClipboard}
          />
        )
      }
    }

    if (resourcesData) {
      return resourcesData.map((resource) =>
        resource && resource.data && resourceView(resource)
      )
    }
  }, [props.resourcesData])

  const getFullView = useCallback(() => {
    const { resources } = props

    if (!resources || !Array.isArray(resources)) {
      return 'w-full'
    }
  }, [props.resources])

  const copyBlockLinkToClipboard = useCallback((blockId) => {
    copy(`((${blockId}))`)
  })

  const getViewer = useCallback(() => {
    const { resource, loadingResource } = props

    if (loadingResource) {
      return (
        <ContainerContent>
          <LoadingOverlay />
        </ContainerContent>
      )
    }

    if (resource.resource.type === 'tweet') {
      return (
        <TweetViewer resource={resource} />
      )
    } else {
      return (
        <ArticleViewer
          onQuoteBlockClick={onQuoteBlockClick}
          highlightTextMode={highlightTextMode}
          onAddHighlightClick={onAddHighlightClick}
          createNoteHighlight={props.createNoteHighlight}
          deleteNoteHighlight={props.deleteNoteHighlight}
          articleMenuOpen={articleMenuOpen}
          copyBlockLinkToClipboard={copyBlockLinkToClipboard}
          dispatch={blocksDispatch}
          {...props}
          blocks={blocks}
        />
      )
    }
  }, [props, highlightTextMode, articleMenuOpen, blocks])

  const getMainView = useCallback(() => {
    if (isNote) {
      return (
        <NoteEditor
          resource={props.resource}
          isEditable={isEditingMode}
          blocks={blocks}
          params={params}
          lastAction={lastAction}
          blocksDispatch={blocksDispatch}
          createBlock={props.createBlock}
          updateBlock={props.updateBlock}
          deleteBlock={props.deleteBlock}
          updateArticle={props.updateArticle}
          baseUrl={baseUrl}
          sticky={props.resources && Array.isArray(props.resources)}
          openResource={props.openResource}
        />
      )
    } else {
      return getViewer()
    }
  }, [props, isNote, blocks, params, lastAction, baseUrl, isEditingMode, highlightTextMode])

  return (
    <Container>
      <NavbarViewerMultiple
        onViewNoteClick={onViewNoteClick}
        highlightTextMode={highlightTextMode}
        isEditable={isEditingMode}
        showNoteIcon={!isNote}
        showHighlightIcon={!isNote}
        showBookmarksIcon={!isNote}
        showOpenResourceIcon="true"
        showMenuIcon
        showNoteButtons={isNoteEditable}
        onArticleHighlightClick={() => setHighlightTextMode(!highlightTextMode)}
        onArticleMenuIconClick={openArticleMenu}
        onArticleOpenIconClick={openExplorerResources}
        hideBookmark={isNote}
        {...props}
      />
      <Content withNav={isNote}>
        <div className={`flex overflow-x-auto hide-scroll-bar ${getFullView()}`}>
          <div className={`flex flex-row ${getFullView()}`}>
            {getMainView()}
            {getOtherResourcesViews}
          </div>
        </div>
        <ArticleMenu
          hidden={!articleMenuOpen}
          onArticleMenuExitClick={() => setArticleMenuOpen(false)}
          {...props}
        />
        <ExplorerResources
          hidden={!explorerOpen}
          setExplorerOpen={setExplorerOpen}
          {...props}
        />
      </Content>
    </Container>
  )
}

export default ResourcePage

function initReducer() {
  return { blocks: [], lastAction: null }
}

function checkIfNote(props) {
  return props.user && props.resource && props.resource.type === 'note'
}
