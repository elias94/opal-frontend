import { useCallback, useState } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { formatContentFlat } from 'shared/libs/formatting'
import { extractDomainUrl, isURL } from 'shared/utils'

import Tooltip from 'components/atoms/Tooltip'

import {
  Container, ResourceContainer, ResourcesContainer,
  ResourceTitle, ResourceSubtitle,
  ResourcePreview, ResourceHeader, ResourceHeaderLeft,
  Section, SectionTitle, TextPart, ResourceImage,
  EmptyList, DateInfo, InfoContainer, ResourceIcon,
  Sep,
} from './styles'

dayjs.extend(relativeTime)

function ResourcesList({ resources, ...props }) {
  if (!resources) {
    return null
  }

  const { externals, notes } = resources || {}


  const renderResources = useCallback((resources, isExternalResource=true) => {
    if (!resources) {
      return <EmptyList>{getEmptyMessage(isExternalResource)}</EmptyList>
    }

    const [articles, excerpts] = resources

    if (articles.length < 1) {
      return <EmptyList>{getEmptyMessage(isExternalResource)}</EmptyList>
    }

    return articles.map((res, i) => (
      <ResourceItem
        key={`ResourceItem_${res[0].id}`}
        resource={res}
        excerpt={excerpts[i]}
        isExternal={isExternalResource}
        deleteResource={props.deleteResource}
        deleteResourceNote={props.deleteResourceNote}
      />
    ))
  }, [resources])

  return (
    <Container>
      <Section>
        <SectionTitle>Latest</SectionTitle>
        <ResourcesContainer>
          {renderResources(externals)}
        </ResourcesContainer>
      </Section>
      <Section>
        <SectionTitle>Notes</SectionTitle>
        <ResourcesContainer>
          {renderResources(notes, false)}
        </ResourcesContainer>
      </Section>
    </Container>
  )
}

export default ResourcesList

function getEmptyMessage(isExternalResource) {
  return isExternalResource ?
    'No articles at the moment.\nImport new article and they will appear here!'
    :
    'No notes at the moment.\nTake notes on imported articles and they will appear here!'
}

function ResourceItem({ resource, excerpt, isExternal, ...props }) {
  const [moueHover, setMouseHover] = useState(false)

  const [article, external, res, saved] = resource
  let subtitle, link, image

  if (isExternal) {
    const { url } = external

    const domain = extractDomainUrl(url)

    subtitle = domain ? domain : url
    link = `/resource/${res.id}`
  } else {
    subtitle = 'Note'
    link = `/resource/${external.source_id}?note=${external.id}`
  }

  if (article.properties && isURL(article.properties.image)) {
    image = article.properties.image
  }

  const preview = excerpt.reduce((acc, e) => `${acc} ${formatContentFlat(e.content)}`, '')
  const trim = (str) => str.length > 200 ? str.slice(0, 200) + '...' : str

  return (
    <ResourceContainer
      onMouseEnter={() => setMouseHover(true)}
      onMouseOut={() => setMouseHover(false)}
    >
      <TextPart>
        <ResourceHeader>
          <ResourceHeaderLeft>
            <Link href={link}>
              <ResourceTitle>
                {article.title}
              </ResourceTitle>
            </Link>
            <ResourceSubtitle>
              {subtitle}
            </ResourceSubtitle>
          </ResourceHeaderLeft>
        </ResourceHeader>
        <ResourcePreview>
          {trim(preview)}
        </ResourcePreview>
        <InfoContainer>
          <DateInfo>
            {dayjs(saved.date).fromNow()}
          </DateInfo>
          <Sep>•</Sep>
          {isExternal && (
            <Tooltip label="Open original">
              <a href={external.url} target="_blank" rel="noopener noreferrer">
                <ResourceIcon icon="globe" />
              </a>
            </Tooltip>
          )}
          <Tooltip label="Remove article">
            <ResourceIcon
              icon={['far', 'trash-alt']}
              onClick={onRemoveClick}
            />
          </Tooltip>
        </InfoContainer>
      </TextPart>
      {image && <ResourceImage style={{ backgroundImage: `url('${image}')` }} />}
    </ResourceContainer>
  )

  function onRemoveClick() {
    if (isExternal) {
      props.deleteResource(res.id)
    } else {
      // external is note
      props.deleteResourceNote(external.id)
    }
  }
}
