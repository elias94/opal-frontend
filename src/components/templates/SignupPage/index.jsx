import SignupForm from 'components/organisms/SignupForm'

import { Container } from './styles'

function SignupPage(props) {
  return (
    <Container>
      <SignupForm {...props} />
    </Container>
  )
}

export default SignupPage
