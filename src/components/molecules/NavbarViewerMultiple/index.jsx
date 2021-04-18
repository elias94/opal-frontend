import { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { svgImport } from 'components/atoms/SVG'
import Icon from 'components/atoms/Icon'
import Tooltip from 'components/atoms/Tooltip'
import DropdownButton from 'components/atoms/DropdownButton'
import InfoDialog from 'components/atoms/InfoDialog'
import OkayCancelDialog from 'components/molecules/OkayCancelDialog'

import {
  Container, LeftContainer, RightContainer,
  NavbarIcon, SVGIcon, IconContainer,
  HeaderButton, ButtonGroup, CenterContainer,
  TabsContainer, TabContainer, AddTab, NavbarArrow,
  CloseTab,
} from './styles'

function NavbarViewerMultiple({ isEditable, ...props }) {
  const router = useRouter()
  const [infoDialogOpen, setInfoDialogOpen] = useState(false)

  const { content, saved, resource: note } = props.resource

  const resourceTabs = useMemo(() => {
    const { resourcesData } = props

    if (resourcesData) {
      return resourcesData.map((resource) => {
        const { data, key } = resource

        if (!data) {
          return null
        }

        return (
          <Tab key={`ResourceTab_${key}`} onTabClose={() => onTabClose(data.resource_id)}>
            {data.content && data.content.title}
          </Tab>
        )
      })
    }
  }, [props.resourcesData])

  return (
    <Container>
      <LeftContainer>
        <Tooltip label="Return to home">
          <div className="flex flex-row justify-start items-center">
            <NavbarArrow
              icon="chevron-left"
              onClick={onArticleHomeClick}
            />
            <div className="mx-auto flex flex-row justify-center items-start select-none text-gray-400 hover:text-gray-600">
              <Link href="/home">
                <h3 className="w-min text-2xl font-black tracking-tight cursor-pointer select-none ">
                  {process.env.NEXT_PUBLIC_APP_NAME}
                </h3>
              </Link>
              <span className="text-xs -mr-4 font-medium pl-1 opacity-70">beta</span>
            </div>
          </div>
        </Tooltip>
        {props.showNoteButtons && (
          <ButtonGroup>
            <DropdownButton
              options={note.private ? ['Public'] : ['Private']}
              tooltipLabel="Change note to private"
              onSelect={onNoteMenuSelect}
            >
              {note.private ? (
               <>
                <Icon icon="user" /> Private
              </>
              ) : (
                <>
                  <Icon icon="users" /> Public
                </>
              )}
            </DropdownButton>
            <Tooltip label={"Read note in article mode"}>
              <HeaderButton secondary onClick={props.onViewNoteClick}>
                {isEditable ? (
                <>
                  <div className="pr-1">
                    <Icon icon="book" />
                  </div> 
                  Read
                </>
                ) : (
                  <>
                    <div className="pr-1">
                      <div className="transform rotate-135">
                        <Icon icon="pen-nib" />
                      </div>
                    </div> 
                    Edit
                  </>
                )}
              </HeaderButton>
            </Tooltip>
            <Tooltip label="Delete note">
              <OkayCancelDialog
                title="Delete note"
                content="Are you sure you want to delete this note permanently?"
                buttonText="Delete"
                whenConfirmClick={onDeleteNoteClick}
              >
                <div className="flex flex-row items-center text-blueGray-400 text-sm hover:text-blueGray-500 cursor-pointer hover:bg-gray-100 rounded-md py-2 px-2">
                  <NavbarIcon withText icon={['far', 'trash-alt']} /> Delete
                </div>
              </OkayCancelDialog>
            </Tooltip>
          </ButtonGroup>
        )}
      </LeftContainer>
      <CenterContainer>
        {!props.isSingleArticle && (
          <TabsContainer>
            <Tab noClose>{content && content.title}</Tab>
            {resourceTabs}
          </TabsContainer>
        )}
      </CenterContainer>
      <RightContainer>
        {props.showBookmarksIcon && (
          <Tooltip label={saved ? "Remove from bookmarks" : "Save to bookmarks"}>
            <NavbarIcon
              icon={saved ? 'bookmark' : ['far', 'bookmark']}
              onClick={props.onArticleStarClick}
            />
          </Tooltip>
        )}
        {props.showHighlightIcon && (
          <Tooltip label="Highlight article">
            <IconContainer onClick={props.onArticleHighlightClick}>
              {!props.highlightTextMode ? (
                <SVGIcon>
                  {svgImport`
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 544 512" width="20" height="20">
                      <path d="M0 479.98L99.88 512l35.56-35.58-67.01-67.04L0 479.98zM527.93 79.27l-63.17-63.2C454.09 5.39 440.04 0 425.97 0c-12.93 0-25.88 4.55-36.28 13.73L124.8 239.96a36.598 36.598 0 0 0-10.79 38.1l13.05 42.83-33.95 33.97c-9.37 9.37-9.37 24.56 0 33.93l62.26 62.29c9.37 9.38 24.58 9.38 33.95 0l33.86-33.88 42.72 13.08a36.54 36.54 0 0 0 10.7 1.61 36.57 36.57 0 0 0 27.43-12.38l226.25-265.13c19.16-21.72 18.14-54.61-2.35-75.11zM272.78 382.18l-35.55-10.89-27.59-8.45-20.4 20.41-16.89 16.9-28.31-28.32 16.97-16.98 20.37-20.38-8.4-27.57-10.86-35.66 38.23-32.65 105.18 105.23-32.75 38.36zm220.99-258.97L326.36 319.39l-101.6-101.65 196.68-168c1.29-1.14 2.82-1.72 4.53-1.72 1.3 0 3.2.35 4.86 2.01l63.17 63.2c2.54 2.56 2.67 6.68-.23 9.98z" class=""></path>
                    </svg>
                  `}
                </SVGIcon>
              ) : (
                <Icon icon={'highlighter'} />
              )}
            </IconContainer>
          </Tooltip>
        )}
        {props.showNoteIcon && (
          <Tooltip label="Add note">
            <NavbarIcon
              icon={'edit'}
              onClick={props.onAddNoteClick}
            />
          </Tooltip>
        )}
        {props.showOpenResourceIcon && (
          <Tooltip label="Open another resource">
            <IconContainer onClick={props.onArticleOpenIconClick}>
              <SVGIcon>
                {svgImport`
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="20" height="20">
                    <path d="M377,105,279.1,7a24,24,0,0,0-17-7H256V128H384v-6.1A23.92,23.92,0,0,0,377,105ZM224,136V0H24A23.94,23.94,0,0,0,0,24V488a23.94,23.94,0,0,0,24,24H360a23.94,23.94,0,0,0,24-24V160H248A24.07,24.07,0,0,1,224,136Zm72,176v16a16,16,0,0,1-16,16H216v64a16,16,0,0,1-16,16H184a16,16,0,0,1-16-16V344H104a16,16,0,0,1-16-16V312a16,16,0,0,1,16-16h64V232a16,16,0,0,1,16-16h16a16,16,0,0,1,16,16v64h64A16,16,0,0,1,296,312Z" class=""></path>
                  </svg>
                `}
              </SVGIcon>
            </IconContainer>
          </Tooltip>
        )}
        {props.showMenuIcon && (
          <Tooltip label="Open menu">
            <NavbarIcon
              icon={'bars'}
              onClick={props.onArticleMenuIconClick}
            />
          </Tooltip>
        )}
      </RightContainer>
      <InfoDialog isOpen={infoDialogOpen} closeDialog={() => setInfoDialogOpen(false)}>
        It seems that you want to open multiple articles! This feature is not implemented yet.
        Let me know that you're insterested!
      </InfoDialog>
    </Container>
  )

  function onTabClose(resourceId) {
    props.closeResource(resourceId)
  }

  function onDeleteNoteClick() {
    props.deleteNote()

    router.push('/home')
  }

  function onNoteMenuSelect(option) {
    if (option.toLowerCase() === 'private') {
      props.setNotePrivate(true)
    } else {
      props.setNotePrivate(false)
    }
  }

  function onArticleHomeClick() {
    router.push('/home')
  }
}

export default NavbarViewerMultiple

function Tab(props) {
  return (
    <TabContainer>
      <div className="truncate w-full">
        {props.children}
      </div>
      {!props.noClose && (
        <CloseTab icon="times" onClick={props.onTabClose} />
      )}
    </TabContainer>
  )
}
