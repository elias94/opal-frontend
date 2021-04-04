import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  loginUser,
  fetchUser,
  sendFeedback
} from 'store'

import LoginPage from 'components/templates/LoginPage'

function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState(null)

  const { user } = fetchUser()

  useEffect(() => {
    if (user) {
      router.push('/home')
    }
  }, [user])

  const login = (username, password) => {
    setIsLoading(true)

    loginUser(username, password)
    .then(data => {
      // save user token to local storage
      localStorage.setItem('access_token', data.access_token)
      // redirect user to /home
      router.push('/home')
    }).catch(e => {
      console.error(e.message)

      setLoginError(e.response.data.detail)
      setIsLoading(false)
    })
  }

  return (
    <div style={{ height: '100vh' }}>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginPage
        login={login}
        error={loginError}
        isLoading={isLoading}
        sendFeedback={sendUserFeedback}
      />
    </div>
  )

  function sendUserFeedback(message) {
    sendFeedback(message)
    .then(() => {
      console.log('Feedback sent!')
    })
    .catch((e) => {
      console.error(e)
    })
  }
}

export default Login
