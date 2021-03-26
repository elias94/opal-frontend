import SignupForm from 'components/organisms/SignupForm'

import { Container } from './styles'

function SignupPage(props) {
  return (
    <div className="w-full h-full mx-auto flex items-center justify-center bg-gray-50">
      <SignupForm {...props} />
    </div>
  )
}

export default SignupPage
