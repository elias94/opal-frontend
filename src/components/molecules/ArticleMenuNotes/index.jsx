import Link from 'next/link' 
import dayjs from 'dayjs'

import { formatContentFlat } from 'shared/libs/formatting'

import {
  Container, NoteHeader, NotePreview,
  NoteTitle, NoteContainer, NoteAuthor,
  NoteDate, EmptyList,
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

function NoteWithExcerpt({ note: { note, article, user, blocks }, resourceId }) {
  const preview = blocks.reduce((acc, b) => `${acc} ${formatContentFlat(b.content)}`, '')
  const trim = (str) => str.length > 220 ? str.slice(0, 220) + '...' : str
  const routePath = `/resource/${resourceId}?note=${note.id}`

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
