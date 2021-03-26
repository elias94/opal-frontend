import LoginForm from 'components/organisms/LoginForm'

import { Container } from './styles'

function LoginPage(props) {
  return (
    <div className="w-full h-full mx-auto flex items-center justify-center bg-gray-50">
      <LoginForm {...props} />
    </div>
  )
}

export default LoginPage
