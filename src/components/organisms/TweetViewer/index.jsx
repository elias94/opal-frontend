import NavbarViewer from 'components/molecules/NavbarViewerSingle'
import TweetBlock from 'components/atoms/TweetBlock'

import {
  Container, TwitterContainer,
} from './styles'

function TweetViewer({ resource, ...props }) {
  const { resource: external, content: tweet, saved } = resource

  return (
    <Container>
      {props.isSingleArticle && (
        <NavbarViewer
          url={external.url}
          saved={!!saved}
          article={tweet}
          showMenuIcon={!props.articleMenuOpen}
          hideHighlight
          {...props}
        />
      )}
      <TwitterContainer>
        <div className="text-center hover:text-gray-600">
          <a className="outline-none" href={external.url} >{external.url}</a>
        </div>
        <TweetBlock tweetId={tweet.id.toString()} />
      </TwitterContainer>
    </Container>
  )
}

export default TweetViewer
