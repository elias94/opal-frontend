import ResourcesList from 'components/organisms/ResourcesList'
import NavbarHome from 'components/molecules/NavbarHome'
import Toast from 'components/atoms/Toast'

import { Container } from './styles'

function HomePage(props) {
  return (
    <Container>
      <NavbarHome
        searchValue={props.searchValue}
        onSearchChange={props.onSearchChange}
        onSearchEnter={props.onSearchEnter}
        onLinkSubmit={props.importArticle}
        {...props}
      />
      <ResourcesList {...props} />
      <Toast toast={props.toast} />
    </Container>
  )
}

export default HomePage
