import { useEffect } from 'react'
import { SWRConfig } from 'swr'
import { ThemeProvider } from 'styled-components'

import GlobalStyle from 'styles/globalStyle'
import Theme from 'styles/theme'
import 'tailwindcss/tailwind.css'

import { config, library, IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faExternalLinkAlt, faNetworkWired,
  faGlobe, faStar, faSearch, faHighlighter,
  faBars, faTimes, faEdit, faCaretRight,
  faTrashAlt, faBookmark, faChevronLeft,
  faExpand,
} from '@fortawesome/free-solid-svg-icons'
import { 
  faStar as farStar,
  faPlusSquare as farPlusSquare,
  faBookmark as farBookmark,
  faTrashAlt as farTrashAlt,
  faEye as farEye,
  faEyeSlash as farEyeSlash,
} from '@fortawesome/free-regular-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

function App({ Component, pageProps }) {

  useEffect(() => {
    // componentDidMount
    
    // Declare fontawesome icons used into the project
    // https://fontawesome.com/how-to-use/on-the-web/using-with/react
    library.add(
      faPlus,
      faExternalLinkAlt,
      faNetworkWired,
      faGlobe,
      faStar,
      farStar,
      faSearch,
      faHighlighter,
      faBars,
      faTimes,
      faEdit,
      faCaretRight,
      farPlusSquare,
      faTrashAlt,
      faBookmark,
      farBookmark,
      faChevronLeft,
      faExpand,
      farTrashAlt,
      farEye,
      farEyeSlash,
    )
  }, [])

  return (
    <SWRConfig value={{ initialData: null }}>
      <GlobalStyle />
      <ThemeProvider theme={Theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  )
}


export default App
