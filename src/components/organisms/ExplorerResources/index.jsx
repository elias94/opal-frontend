import { useRouter } from 'next/router'
import dayjs from 'dayjs'
import KeyEvent from 'shared/keyboard'

import DropdownButton from 'components/atoms/DropdownButton'

import {
  Container, SearchContainer, SearchInput,
  TagElement, TagName, RemoveTag,
} from './styles'

function ExplorerResources({ resourcesType, ...props }) {
  return (
    <Container hidden={props.hidden} {...props}>
      <div className="w-full px-4 py-4 flex flex-row items-center justify-center">
        <SearchContainer>
          {props.searchTags.map((tag, idx) => (
            <SearchTag key={`Tag_${tag}${idx}`} tag={tag} onRemoveTag={props.onRemoveTag} />
          ))}
          <SearchInput
            value={props.searchValue}
            onInput={onSearchChange}
            onKeyDown={onSearchKeydown}
            placeholder="Search"
          />
        </SearchContainer>
        <DropdownButton
          options={resourcesType === 'external' ? ['Notes'] : ['Externals']}
          tooltipLabel="Change resources type"
          onSelect={onSelectionMenuSelect}
          transparent="true"
        >
          {`${resourcesType.charAt(0).toUpperCase()}${resourcesType.slice(1)}s`}
        </DropdownButton>
      </div>
      <div className="w-full px-4 py-4 pb-8 flex-1 flex flex-col overflow-y-auto">
        {renderList()}
      </div>
    </Container>
  )

  function renderList() {
    const { resourcesInfoList, resourceId } = props

    if (!resourcesInfoList) {
      return []
    }

    const { resources } = resourcesInfoList

    return resources.map((res) => {
      const { resource_id } = res

      if (resource_id == resourceId) {
        return null
      }

      return (
        <ResourceItem
          key={`ResourceListItem_${resource_id}`}
          resource={res}
          openResource={props.openResource}
          setExplorerOpen={props.setExplorerOpen}
        />
      )
    })
  }

  function onSelectionMenuSelect(option) {
    const cleaned = option.toLowerCase().substring(0, option.length - 1)

    props.selectResourceType(cleaned)
  }

  function onSearchChange(evt) {
    if (typeof props.onSearchChange === 'function') {
      props.onSearchChange(evt.target.value)
    }
  }

  function onSearchKeydown(evt) {
    const keyEvt = KeyEvent(evt)

    if (keyEvt.isEnter) {
      if (typeof props.onSearchEnter === 'function') {
        props.onSearchEnter(evt.target.value)
      }
    } else if (keyEvt.isBackspace) {
      if (evt.target.value.length === 0) {
        evt.preventDefault()
        props.onEmptySearchBackspace()
      }
    }
  }
}

export default ExplorerResources

function SearchTag({ tag, onRemoveTag }) {
  return (
    <TagElement>
      <TagName>{tag}</TagName>
      <RemoveTag onClick={() => onRemoveTag(tag)} icon="times" />
    </TagElement>
  )
}

function ResourceItem(props) {
  const router = useRouter()

  const { votes, saved_count } = props.resource

  return (
    <div className="flex flex-col pb-4 px-2 cursor-pointer" onClick={onResourceClick}>
      <div className="truncate text-base font-medium text-blueGray-600">
        {getTitle()}
      </div>
      <div className="text-xs italic text-blueGray-400">
        {`${votes} vote${votes === 1 ? '' : 's'}`}
        <div className="px-1 text-xs inline-block">•</div>
        {saved_count} saved
        <div className="px-1 text-xs inline-block">•</div>
        {getDate()}
      </div>
    </div>
  )

  function onResourceClick() {
    const { resource_id } = props.resource
    
    props.openResource(resource_id)
    props.setExplorerOpen(false)
  }

  function getDate() {
    const { saved, content } = props.resource

    if (saved) {
      return dayjs(saved.date).fromNow()
    } else {
      if (content.date_modified) {
        return dayjs(content.date_modified).fromNow()
      } else {
        return dayjs(content.date_created).fromNow()
      }
    }
  }

  function getTitle() {
    const { type, content } = props.resource

    if (type === 'tweet') {
      return `Tweet by ${content.content.author.name}`
    } else {
      return content.title
    }
  }
}
