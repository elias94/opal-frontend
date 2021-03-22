import Link from 'next/link' 
import dayjs from 'dayjs'

import { formatContentFlat } from 'shared/libs/formatting'

import {
  Container, NoteHeader, NotePreview,
  NoteTitle, NoteContainer, NoteAuthor,
  NoteDate, EmptyList,
} from 'components/molecules/ArticleMenuNotes/styles'

function ArticleMenuMentions({ mentions }) {
  if (!mentions || mentions.length == 0) {
    return (
      <Container>
        <EmptyList>
          No mentions at the moment.
        </EmptyList>
      </Container>
    )
  }

  return (
    <Container>
      {renderMentions()}
    </Container>
  )

  function renderMentions() {
    return mentions.map((mention) => {
      return (
        <MentionWithExcerpt
          key={`Mention_${mention.resource.id}`}
          mention={mention}
        />
      )
    })
  }
}

export default ArticleMenuMentions

function MentionWithExcerpt({ mention: { resource, user, article, blocks } }) {
  const resourceId = resource.id
  const preview = blocks.reduce((acc, b) => `${acc} ${formatContentFlat(b.content)}`, '')
  const trim = (str) => str.length > 220 ? str.slice(0, 220) + '...' : str
  const routePath = `/resource/${resourceId}`

  return (
    <NoteContainer>
      <NoteHeader>
        <Link href={routePath}>
          <NoteTitle>
            {article.title}
            <NoteAuthor>
              {user.name}
            </NoteAuthor>
          </NoteTitle>
        </Link>
        <NoteDate>
          {dayjs(article.date_modified).format('DD/MM/YYYY')}
        </NoteDate>
      </NoteHeader>
      <NotePreview>
        {trim(preview)}
      </NotePreview>
    </NoteContainer>
  )
}
