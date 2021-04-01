import Link from 'next/link'
import dayjs from 'dayjs'
import { formatContentFlat } from 'shared/libs/formatting'
import { extractDomainUrl, isURL } from 'shared/utils'

import Tooltip from 'components/atoms/Tooltip'
import OkayCancelDialog from 'components/molecules/OkayCancelDialog'

import {
  ResourceContainer, ResourceTitle, ResourceSubtitle,
  ResourcePreview, ResourceHeader, ResourceHeaderLeft,
  TextPart, ResourceImage, DateInfo, InfoContainer, ResourceIcon,
  Sep, ResourcePrivate, EyeIcon,
} from './styles'

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

  return (
    <ResourceContainer>
      <TextPart>
        <ResourceHeader>
          <ResourceHeaderLeft>
            <Link href={link}>
              <ResourceTitle>
                {getResourceTitle()}
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
            {getResourcePreview()}
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

  function getResourcePreview() {
    const trim = (str) => str.length > 200 ? str.slice(0, 200) + '...' : str

    if (external.type === 'article' || res.type === 'note') {
      const preview = excerpt.reduce((acc, e) => `${acc} ${formatContentFlat(e.content)}`, '')

      return trim(preview)
    } else if (external.type === 'tweet') {
      return trim(article.content.text)
    }
  }

  function getResourceTitle() {
    if (external.type === 'article' || res.type === 'note') {
      return article.title
    } else if (external.type === 'tweet') {
      return `Tweet by ${article.content.author.name}`
    }
  }

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

export default ResourceItem
