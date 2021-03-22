import LoginForm from 'components/organisms/LoginForm'

import { Container } from './styles'

function LoginPage(props) {
  return (
    <Container>
      <LoginForm
        login={props.login}
        error={props.error}
      />
    </Container>
  )
}

export default LoginPage
