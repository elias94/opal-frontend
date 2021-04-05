import { useEffect } from 'react'
import { SWRConfig } from 'swr'
import { ThemeProvider } from 'styled-components'
import splitbee from '@splitbee/web'

import GlobalStyle from 'styles/globalStyle'
import Theme from 'styles/theme'
import 'tailwindcss/tailwind.css'

import { config, library, IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faPlus, faExternalLinkAlt, faNetworkWired,
  faGlobe, faStar, faSearch, faHighlighter,
  faBars, faTimes, faEdit, faCaretRight,
  faTrashAlt, faBookmark, faChevronLeft,
  faExpand, faCaretUp, faQuestion, faShare,
  faChevronDown, faCheck, faUser, faUsers,
  faPenNib, faBook,
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
      faCaretUp,
      faQuestion,
      faShare,
      faCheck,
      faUser,
      faUsers,
      faPenNib,
      faBook,
    )

function App({ Component, pageProps }) {

  useEffect(() => {
    // componentDidMount
    if (process.env.ENV === 'production') {
      splitbee.init({
        token: process.env.SPLITBEE_TOKEN,
        scriptUrl: "/bee.js",
        apiUrl: "/_hive",
      })
    }
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
