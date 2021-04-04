import LoginForm from 'components/organisms/LoginForm'
import FooterHome from 'components/organisms/FooterHome'

function LoginPage(props) {
  return (
    <div className="w-full h-full mx-auto flex flex-col items-center justify-center bg-gray-50">
      <LoginForm {...props} />
      <FooterHome {...props} />
    </div>
  )
}

export default LoginPage
