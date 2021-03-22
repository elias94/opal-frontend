import SignupForm from 'components/organisms/SignupForm'

import { Container } from './styles'

function SignupPage(props) {
  return (
    <Container>
      <SignupForm
        login={props.login}
        onSignup={props.onSignup}
        error={props.error}
      />
    </Container>
  )
}

export default SignupPage
