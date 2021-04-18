import { useRef, useState } from 'react'
import * as dayjs from 'dayjs'

import ArticleMenuSection from 'components/molecules/ArticleMenuSection'
import ArticleMenuNotes from 'components/molecules/ArticleMenuNotes'
import ArticleMenuMentions from 'components/molecules/ArticleMenuMentions'
import ArticleMenuTags from 'components/molecules/ArticleMenuTags'
import Tooltip from 'components/atoms/Tooltip'
import LoadingOverlay from 'components/atoms/LoadingOverlay'

import {
  Container, MenuContainer, HeaderContainer,
  Header, HeaderMenu,
  HeaderTitle, SVGClose, HeaderDetails,
  HeaderDivider, SectionButton, IconClose,
  HeaderSeparator, Caret,
} from './styles'

function ArticleMenu({ resource, ...props }) {
  const tagsSectionRef = useRef(null)

  const { type, resource: external, content: article, saved, saved_count, votes, user_vote } = resource

  if (!article) {
    return (
      <Container style={{ height: '100%' }}>
        <LoadingOverlay transparent="true" />
      </Container>
    )
  }

  return (
    <Container hidden={props.hidden} {...props}>
      <MenuContainer>
        <HeaderContainer>
          <Header>
            <HeaderTitle level="h1">
              <Tooltip label={user_vote ? 'Unvote' : 'Upvote'}>
                <Caret icon="caret-up" voted={!!user_vote} onClick={onVoteButtonClick} />
              </Tooltip>
              {getResourceTitle()}
            </HeaderTitle>
            <HeaderDetails>
              {votes} votes
              <HeaderDivider>•</HeaderDivider>
              {dayjs(article.date_created).format('DD/MM/YYYY')}
              <HeaderDivider>•</HeaderDivider>
              version 1
              <HeaderDivider>•</HeaderDivider>
              {saved_count} saved
            </HeaderDetails>
          </Header>
          <HeaderMenu>
            <Tooltip label="Close menu">
              <IconClose icon="times" onClick={props.onArticleMenuExitClick} />
            </Tooltip>
          </HeaderMenu>
        </HeaderContainer>
        <ArticleMenuSection
          ref={tagsSectionRef}
          initialValue={true}
          title="tags"
          tooltip={`Add your custom tags to categorize your resources. More good tag you add, more will be easy to find it later.`}
          extraHeader={<SectionButton secondary onClick={onAddTagClick}>Add Tag</SectionButton>}
          noShadow
        >
          <ArticleMenuTags
            tags={props.tags}
            isInputTagActive={props.isInputTagActive}
            saveTag={props.saveTag}
            deleteTag={props.deleteTag}
            onTagInputCancel={onTagInputCancel}
            tagInputError={props.tagInputError}
            setTagInputError={props.setTagInputError}
          />
        </ArticleMenuSection>
        <ArticleMenuSection
          initialValue={true}
          title="notes"
          tooltip={`You can see all the public notes shared by the community. You can read them, annotate and upvote them.`}
          extraHeader={<SectionButton secondary onClick={props.onAddNoteClick}>Add Note</SectionButton>}
        >
          <ArticleMenuNotes articleNotes={props.articleNotes} resourceId={props.resourceId} />
        </ArticleMenuSection>
        <ArticleMenuSection
          initialValue={true}
          title="Linked References"
          tooltip={`You can see all the notes that are linking this article or quoting portions of it. Linked references are an implementation of the backlink concept.`}
        >
          <ArticleMenuMentions mentions={props.mentions} />
        </ArticleMenuSection>
        {/* <ArticleMenuSection
          title="similar articles"
          tooltip={`Add your custom tags to categorize documents.
          \nWe already added some tags for you.\n\nMore good tag you add, more will be easy to find documents later.`}
        >

        </ArticleMenuSection> */}
      </MenuContainer>
    </Container>
  )

  function onAddTagClick() {
    tagsSectionRef.current.open()
    props.setIsInputTagActive(true)
  }

  function onTagInputCancel() {
    props.setIsInputTagActive(false)
  }

  function getResourceTitle() {
    if (type === 'note' || external.type === 'article') {
      return article.title
    } else if (external.type === 'tweet') {
      return `Tweet by ${article.content.author.name}`
    }
  }

  function onVoteButtonClick() {
    const vote = !user_vote

    if (typeof props.saveUserVote === 'function') {
      props.saveUserVote(vote)
    }
  }
}

export default ArticleMenu
