import { fetchResourceWithExcerpt } from 'store'
import Link from 'next/link'
import Tooltip from 'components/atoms/Tooltip'

import {
  LinkEl
} from './styles'

function InternalLink({ node }) {
  const { title, url, children } = node
  const resourceId = children[0].value

  const { articleWithExcerpt } = fetchResourceWithExcerpt(resourceId)
  const { article, blocks } = articleWithExcerpt || {}
  const articleTitle = article ? article.title : ''
  
  return (
    <Link href={url}>
      <Tooltip label={articleTitle}>
        <LinkEl href={url} title={`Article - ${articleTitle}`}>
          {articleTitle}
        </LinkEl>
      </Tooltip>
    </Link>
  )
}

export default InternalLink
