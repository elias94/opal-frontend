import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { signupUser, loginUser, fetchUser } from 'store'

import SignupPage from 'components/templates/SignupPage'

export default function Signup() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [signupError, setSignupError] = useState(null)

  const { user } = fetchUser()

  useEffect(() => {
    if (user) {
      router.push('/home')
    }
  }, [user])

  function SignupCallback(username, email, password) {
    setIsLoading(true)

    signupUser(username, email, password)
    .then(() => {
      // try to login
      loginUser(username, password)
      .then(data => {
        // save user token to local storage
        localStorage.setItem('access_token', data.access_token)
        // redirect user to /home
        router.push('/home')
      }).catch(e => {
        console.error(e.message)

        setSignupError(e.response.data.detail)
        setIsLoading(false)
      })
    }).catch(e => {
      console.error(e.message)

      setSignupError(e.response.data.detail)
      setIsLoading(false)
    })
  }

  return (
    <div style={{ height: '100vh' }}>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} - Signup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignupPage onSignup={SignupCallback} error={signupError} isLoading={isLoading} />
    </div>
  )
}
