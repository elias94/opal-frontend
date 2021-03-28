import Link from 'next/link' 
import dayjs from 'dayjs'

import { formatContentFlat } from 'shared/libs/formatting'

import Tooltip from 'components/atoms/Tooltip'

import {
  Container, NoteHeader, NotePreview,
  NoteTitleContainer, NoteContainer, NoteAuthor,
  NoteDate, EmptyList, NoteVotes, Caret,
  NoteTitle,
} from './styles'

function ArticleMenuNotes({ articleNotes, resourceId }) {
  if (!articleNotes || articleNotes.length == 0) {
    return (
      <Container>
        <EmptyList>
          No notes at the moment. Add your one!
        </EmptyList>
      </Container>
    )
  }

  return (
    <Container>
      {renderNotes()}
    </Container>
  )

  function renderNotes() {
    return articleNotes.map((note) => {
      return (
        <NoteWithExcerpt
          key={`NoteExcerpt_${note.note.id}`}
          note={note}
          resourceId={resourceId}
        />
      )
    })
  }
}

export default ArticleMenuNotes

function NoteWithExcerpt({ 
  note: { note, article, user, blocks, votes },
  resourceId,
}) {
  const preview = blocks.reduce((acc, b) => `${acc} ${formatContentFlat(b.content)}`, '')
  const trim = (str) => str.length > 220 ? str.slice(0, 220) + '...' : str
  const routePath = `/r/${resourceId}?note=${note.id}`

  return (
    <NoteContainer>
      <NoteHeader>
        <Tooltip label="Community rating">
          <NoteVotes>
            {votes}
          </NoteVotes>
        </Tooltip>
        <Link href={routePath}>
          <NoteTitleContainer>
            <NoteTitle>
              {article.title}
            </NoteTitle>
            <NoteAuthor>
              {user.name}
            </NoteAuthor>
          </NoteTitleContainer>
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
