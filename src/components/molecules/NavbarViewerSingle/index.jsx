import { useRouter } from 'next/router'
import Link from 'next/link'

import { svgImport } from 'components/atoms/SVG'
import Icon from 'components/atoms/Icon'
import Tooltip from 'components/atoms/Tooltip'

import {
  Container, LeftContainer, RightContainer,
  NavbarIcon, SVGIcon, HighlightIconContainer,
  NavbarArrow,
} from './styles'

function NavbarViewer({ url, saved, highlightTextMode, isSingleArticle, ...props }) {
  const router = useRouter()

  return (
    <Container>
      <LeftContainer>
        {isSingleArticle && (
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
        )}
      </LeftContainer>
      <RightContainer>
        {!props.hideBookmark && (
          <Tooltip label={saved ? "Remove from your articles" : "Save to your articles"}>
            <NavbarIcon
              icon={saved ? 'bookmark' : ['far', 'bookmark']}
              onClick={props.onArticleStarClick}
            />
          </Tooltip>
        )}
        {!props.hideHighlight && (
          <Tooltip label="Highlight article">
            {/* Avoid react error for unmounting component with attached events */}
            <HighlightIconContainer onClick={props.onArticleHighlightClick}>
              {!highlightTextMode ? (
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
            </HighlightIconContainer>
          </Tooltip>
        )}
        {isSingleArticle && (
          <Tooltip label="Add note">
            <NavbarIcon
              icon={'edit'}
              onClick={props.onAddNoteClick}
            />
          </Tooltip>
        )}
        <Tooltip label={props.articleMenuOpen ? 'Close menu' : 'Open menu'}>
          <NavbarIcon
            icon={'bars'}
            onClick={props.onArticleMenuIconClick}
          />
        </Tooltip>
      </RightContainer>
    </Container>
  )

  function onArticleHomeClick() {
    router.push('/home')
  }
}

export default NavbarViewer
