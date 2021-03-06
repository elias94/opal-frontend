import { useEffect, useReducer, useState, useCallback } from 'react'
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

import { Container, Content, ContainerContent } from './styles'

function ResourcePage(props) {
  const [isNoteActive, setIsNoteActive] = useState(!!props.noteArticle)
  const [highlightTextMode, setHighlightTextMode] = useState(false)
  const [isNoteEditable, setIsNoteEditable] = useState(false)
  const [articleMenuOpen, setArticleMenuOpen] = useState(!props.noteId)

  // Reducer for client-side blocks management
  const [
    { blocks, params, lastAction },
    blocksDispatch,
  ] = useReducer(blocksReducer, null, initReducer)

  const baseUrl = props.resource.content ? props.resource.resource.url : ''

  const onQuoteBlockClick = useCallback((sourceBlock) => {
    const intQuoteBlock = generateInternalQuoteBlock(sourceBlock, blocks, props.noteArticle.id)

    let lastBlock = null

    if (blocks.length > 0) {
      lastBlock = blocks[blocks.length - 1]
    }

    blocksDispatch({ type: 'APPEND', payload: intQuoteBlock })
  }, [blocks, props.noteArticle])

  useEffect(() => {
    if (props.user && props.noteArticle) {
      const { id: userId } = props.user
      const { author } = props.noteArticle
  
      setIsNoteEditable(userId === author)
    }
  }, [props.user, props.noteArticle])

  useEffect(() => {
    if (props.noteId) {
      setArticleMenuOpen(false)
    }
  }, [props.noteId])

  useEffect(() => {
    if (!props.noteId) {
      setIsNoteActive(false)
    }
    setIsNoteActive(!!props.noteArticle)
  }, [props.noteArticle, props.noteId])

  return (
    <Container>
      {!props.isSingleArticle && props.noteArticle && (
        <NavbarViewerMultiple
          onViewNoteClick={onViewNoteClick}
          highlightTextMode={highlightTextMode}
          isEditable={isNoteEditable}
          showNoteIcon={!isNoteActive}
          showMenuIcon
          showNoteEditButton={props.noteArticle.author === props.user.id}
          onArticleHighlightClick={onArticleHighlightClick}
          onArticleMenuIconClick={openArticleMenu}
          {...props}
        />
      )}
      <Content withNav={isNoteActive}>
        {isNoteActive && props.noteArticle && (
          <NoteEditor
            isEditable={isNoteEditable}
            blocks={blocks}
            params={params}
            lastAction={lastAction}
            blocksDispatch={blocksDispatch}
            noteArticle={props.noteArticle}
            noteBlocks={props.noteBlocks}
            loadingNoteBlocks={props.loadingNoteBlocks}
            createBlock={props.createBlock}
            updateBlock={props.updateBlock}
            deleteBlock={props.deleteBlock}
            updateArticle={props.updateArticle}
            baseUrl={baseUrl}
          />
        )}
        {getViewer()}
        {articleMenuOpen && (
          <ArticleMenu
            hidden={!articleMenuOpen}
            onArticleMenuExitClick={() => setArticleMenuOpen(false)}
            {...props}
          />
        )}
      </Content>
    </Container>
  )

  function getViewer() {
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
        <TweetViewer
          onArticleMenuIconClick={openArticleMenu}
          articleMenuOpen={articleMenuOpen}
          {...props}
        />
      )
    } else {
      return (
        <ArticleViewer
          onQuoteBlockClick={onQuoteBlockClick}
          onArticleHighlightClick={onArticleHighlightClick}
          highlightTextMode={highlightTextMode}
          onAddHighlightClick={onAddHighlightClick}
          createNoteHighlight={props.createNoteHighlight}
          deleteNoteHighlight={props.deleteNoteHighlight}
          onArticleMenuIconClick={openArticleMenu}
          articleMenuOpen={articleMenuOpen}
          {...props}
        />
      )
    }
  }

  function openArticleMenu() {
    setArticleMenuOpen(!articleMenuOpen)
  }

  function onViewNoteClick() {
    setIsNoteEditable(!isNoteEditable)
  }

  function onArticleHighlightClick() {
    setHighlightTextMode(!highlightTextMode)
  }

  function onAddHighlightClick(highlight) {
    const intHighlightBlock = generateInternalHighlight(
      highlight,
      blocks,
      props.noteArticle.id
    )

    blocksDispatch({ type: 'APPEND', payload: intHighlightBlock })
  }
}

export default ResourcePage

function initReducer() {
  return { blocks: [], lastAction: null }
}
