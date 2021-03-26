import LoginForm from 'components/organisms/LoginForm'

import { Container } from './styles'

function LoginPage(props) {
  return (
    <Container>
      <LoginForm {...props} />
    </Container>
  )
}

export default LoginPage
