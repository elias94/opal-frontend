import ResourcesList from 'components/organisms/HomeResourcesList'
import NavbarHome from 'components/molecules/NavbarHome'
import Toast from 'components/atoms/Toast'
import OnboardingDialog from 'components/molecules/OnboardingDialog'
import FooterHome from 'components/organisms/FooterHome'

import { Container } from './styles'

function HomePage(props) {
  const { user } = props

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
      {user && !user.onboard && (
        <OnboardingDialog onClose={props.setOnboard} />
      )}
      <FooterHome {...props} />
    </Container>
  )
}

export default HomePage
