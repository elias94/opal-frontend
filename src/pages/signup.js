import Head from 'next/head'
import { useRouter } from 'next/router'
import { signupUser, loginUser } from 'store'

import SignupPage from 'components/templates/SignupPage'

export default function Signup() {
  const router = useRouter()
  let signupError = null

  function SignupCallback(username, email, password) {
    signupUser(username, email, password).then(() => {
      // try to login
      loginUser(username, password).then(data => {
        // save user token to local storage
        localStorage.setItem('access_token', data.access_token)
        // redirect user to /home
        router.push('/home')
      }).catch(error => {
        console.error(error.message)
        signupError = error
      })
    }).catch(error => {
      console.error(error.message)
      signupError = error
    })
  }

  return (
    <div style={{ height: '100%' }}>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} - Signup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignupPage onSignup={SignupCallback} error={signupError} />
    </div>
  )
}
