import { useCallback, useState } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { formatContentFlat } from 'shared/libs/formatting'
import { extractDomainUrl, isURL } from 'shared/utils'

import Tooltip from 'components/atoms/Tooltip'
import IconButton from 'components/atoms/IconButton'

import {
  Container, ResourceContainer, ResourcesContainer,
  ResourceTitle, ResourceSubtitle,
  ResourcePreview, ResourceHeader, ResourceHeaderLeft,
  Section, SectionTitle, TextPart, ResourceImage,
  EmptyList, DateInfo, InfoContainer, ResourceIcon,
  Sep, SectionHeader, SectionHeaderIcon,
  ResourcePrivate,
} from './styles'

dayjs.extend(relativeTime)

function HomeResourcesList({ resources, ...props }) {
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
        hideResource={props.hideResource}
      />
    ))
  }, [resources])

  return (
    <Container className="sm:w-full">
      <Section>
        <SectionHeader>
          <SectionTitle>Latest Articles</SectionTitle>
          <SectionTitle link>
            All articles <SectionHeaderIcon icon="chevron-left" />
          </SectionTitle>
        </SectionHeader>
        <ResourcesContainer>
          {renderResources(externals)}
        </ResourcesContainer>
      </Section>
      <Section>
        <SectionHeader>
          <SectionTitle>Latest Notes</SectionTitle>
          <SectionTitle link>
            All Notes <SectionHeaderIcon icon="chevron-left" />
          </SectionTitle>
        </SectionHeader>
        <ResourcesContainer>
          {renderResources(notes, false)}
        </ResourcesContainer>
      </Section>
    </Container>
  )
}

export default HomeResourcesList

function getEmptyMessage(isExternalResource) {
  return isExternalResource ?
    'No articles at the moment.\nImport new article and they will appear here!'
    :
    'No notes at the moment.\nTake notes on imported articles and they will appear here!'
}

function ResourceItem({ resource, excerpt, isExternal, ...props }) {
  const [article, external, res, saved] = resource

  let subtitle, link, image

  if (isExternal) {
    const { url } = external

    const domain = extractDomainUrl(url)

    subtitle = domain ? domain : url
    link = `/r/${res.id}`
  } else {
    subtitle = 'Note'
    link = `/r/${external.source_id}?note=${external.id}`
  }

  if (article.properties && isURL(article.properties.image)) {
    image = article.properties.image
  }

  const preview = excerpt.reduce((acc, e) => `${acc} ${formatContentFlat(e.content)}`, '')
  const trim = (str) => str.length > 200 ? str.slice(0, 200) + '...' : str

  return (
    <ResourceContainer>
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
          <Tooltip label={saved.private ? 'Make it visible on your profile' : 'Hide from your profile'}>
            <ResourcePrivate private={saved.private} onClick={onResourceHideClick}>
              {saved.private ? (
                <IconButton icon={['far', 'eye-slash']} />
              ) : (
                <IconButton icon={['far', 'eye']} />
              )}
            </ResourcePrivate>
          </Tooltip>
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

  function onResourceHideClick() {
    if (typeof props.hideResource === 'function') {
      props.hideResource(res.id, !saved.private)
    }
  }

  function onRemoveClick() {
    if (isExternal) {
      props.deleteResource(res.id)
    } else {
      // external is note
      props.deleteResourceNote(external.id)
    }
  }
}
