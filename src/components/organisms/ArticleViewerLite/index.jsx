import copy from 'copy-to-clipboard'
import { extractDomainUrl } from 'shared/utils'
import {
  fetchResource,
  fetchBlocks,
} from 'store'

import Block from 'components/molecules/Block'
import Tooltip from 'components/atoms/Tooltip'
import LoadingOverlay from 'components/atoms/LoadingOverlay'

import {
  Container, ArticleContainer,
  ArticleContent, TitleStyled,
  Source, ArticleHeader,
} from './styles'

function ArticleViewerLite({ isSingleArticle, ...props }) {
  const {
    blocks,
    loading: loadingBlocks 
  } = fetchBlocks(getArticleId(props.resource))

  if (!props.resource) {
    return (
      <Container>
        <LoadingOverlay />
      </Container>
    )
  }

  const { resource: external, content: article } = props.resource

  return (
    <Container>
      <ArticleContainer>
        <ArticleContent>
          <ArticleHeader>
            <TitleStyled level={"h1"}>{article.title}</TitleStyled>
            <Source>
              <Tooltip label={external.url}>
                <a
                  href={external.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row items-center"
                >
                  <img
                    className="w-6 h-6 mr-1 rounded-sm"
                    src={`https://s2.googleusercontent.com/s2/favicons?domain=${external.url}&sz=${64}`}
                  />
                  {external.url && extractDomainUrl(external.url)}
                </a>
              </Tooltip>
            </Source>
          </ArticleHeader>
          {!loadingBlocks ? blocks.map((blk) => (
            <Block
              key={`Block_${blk.id}`}
              block={blk}
              url={external.url}
              noAdd={isSingleArticle}
              copyBlockLinkToClipboard={props.copyBlockLinkToClipboard}
              {...props}
            />
          )) : (
            <div>
              <LoadingOverlay />
            </div>
          )}
        </ArticleContent>
      </ArticleContainer>
    </Container>
  )
}

export default ArticleViewerLite

function getArticleId(resource) {
  const { content } = resource

  if (!content) {
    return null
  }

  return content.id
}
