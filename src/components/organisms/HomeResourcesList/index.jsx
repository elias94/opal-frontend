import { useState } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { formatContentFlat } from 'shared/libs/formatting'
import { extractDomainUrl, isURL } from 'shared/utils'

import Tooltip from 'components/atoms/Tooltip'
import LoadingOverlay from 'components/atoms/LoadingOverlay'
import OkayCancelDialog from 'components/molecules/OkayCancelDialog'

import {
  Container, ResourceContainer, ResourcesContainer,
  ResourceTitle, ResourceSubtitle,
  ResourcePreview, ResourceHeader, ResourceHeaderLeft,
  Section, SectionTitle, TextPart, ResourceImage,
  EmptyList, DateInfo, InfoContainer, ResourceIcon,
  Sep, SectionHeader, SectionHeaderIcon,
  ResourcePrivate, SectionFooter, EyeIcon,
} from './styles'

dayjs.extend(relativeTime)

function HomeResourcesList({ resources, ...props }) {
  if (!resources) {
    if (props.loadingResources) {
      return <LoadingOverlay />
    } else {
      return (
        <div className="w-full h-auto pt-60 mx-auto flex items-center justify-center text-center">
          <span className="text-gray-300 text-lg">
            Error loading resources.
            <br /><br />
            Plese let me know!
            <br />
            hey@opal.to
            <a
              href="https://twitter.com/elia_scotto"
              title="@elia_scotto"
              className="inline-flex flex-row items-center justify-center ml-8 focus:outline-none"
            >
              @elia_scotto
            </a>
          </span>
        </div>
      )
    }
  }

  const [displayMode, setDisplayMode] = useState(null)

  const { externals, notes, info } = resources

  if (displayMode) {
    let resourcesList, showNext, showPrev

    if (displayMode === 'articles') {
      showNext = props.skipPaging + externals[0].length < info['external_count']
      showPrev = props.skipPaging > 0
      resourcesList = renderResources(externals, true)
    } else if (displayMode === 'notes') {
      showNext = props.skipPaging + notes[0].length < info['notes_count']
      showPrev = props.skipPaging > 0
      resourcesList = renderResources(notes, false)
    } else {
      return null
    }

    return (
      <Container className="sm:w-full">
        <Section>
          <SectionHeader>
            <SectionTitle link onClick={resetMode}>
              <SectionHeaderIcon icon="chevron-left" /> Back
            </SectionTitle>
          </SectionHeader>
          <ResourcesContainer>
            {resourcesList}
          </ResourcesContainer>
          {(showNext || showPrev) && (
            <div className="w-full pt-4 flex flex-row items-center justify-center">
              {showPrev && (
                <SectionTitle link onClick={() => props.updatePaging(-1)}>
                  <SectionHeaderIcon icon="chevron-left" /> Newer
                </SectionTitle>
              )}
              {showPrev && showNext && (
                <div className="px-4">

                </div>
              )}
              {showNext && (
                <SectionTitle link onClick={() => props.updatePaging(1)}>
                  Older <SectionHeaderIcon icon="chevron-left" rotated />
                </SectionTitle>
              )}
            </div>
          )}
        </Section>
      </Container>
    )
  }

  const showAllArticlesLink = props.displayListLength < info['external_count']
  const showAllNotesLink = props.displayListLength < info['notes_count']

  return (
    <Container className="sm:w-full">
      <Section>
        <SectionHeader>
          <SectionTitle>Latest Articles</SectionTitle>
          {showAllArticlesLink && (
            <SectionTitle link onClick={() => setDisplayMode('articles')}>
              All articles <SectionHeaderIcon icon="chevron-left" rotated />
            </SectionTitle>
          )}
        </SectionHeader>
        <ResourcesContainer>
          {renderResources(externals)}
        </ResourcesContainer>
      </Section>
      <Section>
        <SectionHeader>
          <SectionTitle>Latest Notes</SectionTitle>
          {showAllNotesLink && (
            <SectionTitle link onClick={() => setDisplayMode('notes')}>
              All Notes <SectionHeaderIcon icon="chevron-left" rotated />
            </SectionTitle>
          )}
        </SectionHeader>
        <ResourcesContainer>
          {renderResources(notes, false)}
        </ResourcesContainer>
      </Section>
    </Container>
  )

  function resetMode() {
    setDisplayMode(null)
    if (typeof props.resetPaging === 'function') {
      props.resetPaging()
    }
  }

  function renderResources(resources, isExternalResource=true) {
    if (!resources) {
      return <EmptyList>{getEmptyMessage(isExternalResource)}</EmptyList>
    }

    let [articles, excerpts] = resources

    if (displayMode === null) {
      articles = articles.slice(0, props.displayListLength)
    }

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
  }
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
            <Link href={link}>
              <ResourceSubtitle>
                {subtitle}
              </ResourceSubtitle>
            </Link>
          </ResourceHeaderLeft>
        </ResourceHeader>
        <ResourcePreview>
          <Link href={link}>
            {trim(preview)}
          </Link>
        </ResourcePreview>
        <InfoContainer>
          <DateInfo>
            {dayjs(saved.date).fromNow()}
          </DateInfo>
          <Tooltip label={saved.private ? 'Show on your public profile' : 'Hide on your public profile'}>
            <ResourcePrivate private={saved.private} onClick={onResourceHideClick}>
              {saved.private ? (
                <EyeIcon icon={['far', 'eye-slash']} />
              ) : (
                <EyeIcon icon={['far', 'eye']} />
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
          <Tooltip label={isExternal ? 'Remove article' : 'Delete Note'}>
            <OkayCancelDialog
              title={isExternal ? 'Remove article' : 'Delete note'}
              content={isExternal ?
                'Are you sure you want to remove this article from your library?'
                :
                'Are you sure you want to delete this note permanently?'
              }
              buttonText={isExternal ? 'Remove' : 'Delete'}
              whenConfirmClick={onRemoveClick}
            >
              <ResourceIcon icon={['far', 'trash-alt']} />
            </OkayCancelDialog>
          </Tooltip>
        </InfoContainer>
      </TextPart>
      {image && (
        <Link href={link}>
          <ResourceImage style={{ backgroundImage: `url('${image}')` }} />
        </Link>
      )}
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
