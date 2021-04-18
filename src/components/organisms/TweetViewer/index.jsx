import TweetBlock from 'components/atoms/TweetBlock'
import LoadingOverlay from 'components/atoms/LoadingOverlay'

import {
  Container, TwitterContainer,
} from './styles'

function TweetViewer(props) {
  if (!props.resource && loadingResource) {
    return (
      <Container>
        <LoadingOverlay />
      </Container>
    )
  }

  const { resource: external, content: tweet } = props.resource

  return (
    <Container>
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
