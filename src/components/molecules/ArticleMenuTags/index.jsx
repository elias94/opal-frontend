import KeyEvent from 'shared/keyboard'

import Tooltip from 'components/atoms/Tooltip'

import {
  Container, TagElement, TagName, RemoveTag,
  EditableTagContainer, EditableTag, TagBottomContainer,
  TagsEmpty,
} from './styles'

function ArticleMenuTags({ tags, isInputTagActive, ...props }) {
  return (
    <Container>
      {renderTags(tags)}
      {isInputTagActive && (
        <TagBottomContainer>
          <InputTag
            saveTag={props.saveTag}
            onTagInputCancel={props.onTagInputCancel}
          />
          {props.tagInputError}
        </TagBottomContainer>
      )}
    </Container>
  )

  function renderTags(tags) {
    if (!isInputTagActive && (!tags || tags.length === 0)) {
      return <TagsEmpty>Add tags for this article</TagsEmpty>
    }
  
    return tags.map(({ resource_tag: tag }) => {
      return (
        <TagElement key={`ArticleTag_${tag.raw}`}>
          <TagName>
            {tag.raw}
          </TagName>
          <Tooltip label="Remove tag">
            <RemoveTag onClick={() => props.deleteTag(tag.raw)} icon="times"/>
          </Tooltip>
        </TagElement>
      )
    })
  }
}

export default ArticleMenuTags

function InputTag({ saveTag, onTagInputCancel }) {
  return (
    <EditableTagContainer>
      <EditableTag
        type="text"
        autocapitalize="off"
        autocorrect="off"
        autocomplete="username"
        autoFocus="autofocus"
        onKeyDown={onKeyDown}
      />
      <Tooltip label="Cancel">
        <RemoveTag onClick={onTagInputCancel} icon="times"/>
      </Tooltip>
    </EditableTagContainer>
  )

  function onKeyDown(evt) {
    const keyEvt = KeyEvent(evt)
    const { value } = evt.target

    if (keyEvt.isEnter && value.length > 0) {
      saveTag(value)
    } else if (keyEvt.isEsc) {
      onTagInputCancel()
    }
  }
}
