import Link from 'next/link'
import KeyEvent from 'shared/keyboard'

import { svgImport } from 'components/atoms/SVG'
import ImportDialog from 'components/molecules/ImportDialog'
import SearchIcon from 'components/atoms/SearchIcon'
import Tooltip from 'components/atoms/Tooltip'

import {
  Container, SVGSearch,
  SearchInput, SearchContainer,
  UserContainer, UserTitle,
  UserLogo, UserMenu,
  LeftContainer, CenterContainer, RightContainer,
  TagElement, TagName, RemoveTag, IconDown,
  UserDisplay, WriteButton, WriteIcon,
} from './styles'

function NavbarHome(props) {
  return (
    <Container>
      <LeftContainer>
        <div className="mx-auto flex flex-row justify-center items-start pl-5 select-none cursor-pointer">
          <Link href="/home">
            <h3 className="w-min text-3xl font-black tracking-tight color-gradient select-none">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </h3>
          </Link>
          <span className="text-xs -mr-4 font-medium pl-1 opacity-50">beta</span>
        </div>
      </LeftContainer>
      <CenterContainer>
        <div className="flex flex-row items-center mr-5">
          <ImportDialog onLinkSubmit={props.onLinkSubmit} />
          <Tooltip label="Write an article">  
            <WriteButton onClick={props.addNote}>
              <WriteIcon icon="pen-nib" /> Write
            </WriteButton>
          </Tooltip>
        </div>
        <SearchContainer>
          {props.tags.map((tag, idx) => (
            <SearchTag key={`Tag_${tag}${idx}`} tag={tag} onRemoveTag={props.onRemoveTag} />
          ))}
          <SearchInput
            value={props.searchValue}
            onInput={onSearchChange}
            onKeyDown={onSearchKeydown}
            placeholder="Search your resources"
          />
          <SearchIcon />
        </SearchContainer>
      </CenterContainer>
      <RightContainer>
        <UserName user={props.user} />
      </RightContainer>
    </Container>
  )

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

export default NavbarHome

function SearchTag({ tag, onRemoveTag }) {
  return (
    <TagElement>
      <TagName>{tag}</TagName>
      <RemoveTag onClick={() => onRemoveTag(tag)} icon="times" />
    </TagElement>
  )
}

function UserName({ user }) {
  const initial = user ? user.name.slice(0, 1) : ''

  return (
    <UserContainer>
      <Link href={`/${user ? user.name : ''}`}>
        <UserDisplay>
          <UserLogo>
            {initial}
          </UserLogo>
          <UserTitle>
            {user ? user.display_name : ''}
          </UserTitle>
        </UserDisplay>
      </Link>
      <UserMenu>
        <IconDown>
          {svgImport`
            <svg height="12" width="12" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" role="img"><path d="M12 19.5L.66 8.29c-.88-.86-.88-2.27 0-3.14.88-.87 2.3-.87 3.18 0L12 13.21l8.16-8.06c.88-.87 2.3-.87 3.18 0 .88.87.88 2.28 0 3.14L12 19.5z"></path></svg>
          `}
        </IconDown>
      </UserMenu>
    </UserContainer>
  )
}
