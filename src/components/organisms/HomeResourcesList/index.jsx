import { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import LoadingOverlay from 'components/atoms/LoadingOverlay'
import ResourceItem from 'components/molecules/ResourceItem'

import {
  Container, ResourcesContainer,
  Section, SectionTitle,
  EmptyList, SectionHeader, SectionHeaderIcon,
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
            <span className="text-xl">Error loading resources.</span>
            <br /><br /><br />
            Plese let me know!
            <br /><br/>
            hey@opal.to
            <a
              href="https://twitter.com/getopal"
              title="@getopal"
              className="inline-flex flex-row items-center justify-center ml-8 focus:outline-none"
            >
              @getopal
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

    let [articles] = resources

    function getExcerpt(article) {
      const [,excerpts] = resources
      return excerpts.find(ex => ex[0].article_id === article.id)
    }

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
        excerpt={getExcerpt(res[0])}
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
