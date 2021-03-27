import * as dayjs from 'dayjs'

import ArticleMenuSection from 'components/molecules/ArticleMenuSection'
import ArticleMenuNotes from 'components/molecules/ArticleMenuNotes'
import ArticleMenuMentions from 'components/molecules/ArticleMenuMentions'
import ArticleMenuTags from 'components/molecules/ArticleMenuTags'
import Tooltip from 'components/atoms/Tooltip'

import {
  Container, MenuContainer, HeaderContainer,
  Header, HeaderMenu,
  HeaderTitle, SVGClose, HeaderDetails,
  HeaderDivider, SectionButton, IconClose,
} from './styles'

function ArticleMenu({ resource, ...props }) {

  const { content, saved, saved_count } = resource

  if (!content) {
    return null
  }

  const [, article] = content

  return (
    <Container hidden={props.hidden}>
      <MenuContainer>
        <HeaderContainer>
          <Header>
            <HeaderTitle level="h1">
              {article.title}
            </HeaderTitle>
            <HeaderDetails>
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
          initialValue={true}
          title="tags"
          tooltip={`Add your custom tags to categorize documents. We already added some tags for you. More good tag you add, more will be easy to find documents later.`}
          extraHeader={<SectionButton secondary onClick={props.onAddTagClick}>Add Tag</SectionButton>}
        >
          <ArticleMenuTags
            tags={props.tags}
            isInputTagActive={props.isInputTagActive}
            saveTag={props.saveTag}
            deleteTag={props.deleteTag}
            onTagInputCancel={props.onTagInputCancel}
            tagInputError={props.tagInputError}
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
          title="mentions"
          tooltip={`In this section you can see all the notes that are linking this article or quoting portions of it. Mentions implement the backlink concept.`}
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
}

export default ArticleMenu
