import SignupForm from 'components/organisms/SignupForm'
import FooterHome from 'components/organisms/FooterHome'

function SignupPage(props) {
  return (
    <div className="w-full h-full mx-auto flex flex-col items-center justify-center bg-gray-50">
      <SignupForm {...props} />
      <FooterHome {...props} />
    </div>
  )
}

export default SignupPage
