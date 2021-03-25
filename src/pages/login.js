import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { loginUser, fetchUser } from 'store'

import LoginPage from 'components/templates/LoginPage'

function Login() {
  const router = useRouter()
  let loginError = null

  const { user } = fetchUser()

  useEffect(() => {
    if (user) {
      router.push('/home')
    }
  }, [user])

  const login = (username, password) => {
    loginUser(username, password).then(data => {
      // save user token to local storage
      localStorage.setItem('access_token', data.access_token)
      // redirect user to /home
      router.push('/home')
    }).catch(error => {
      console.error(error.message)
      loginError = error
    })
  }

  return (
    <div style={{ height: '100vh' }}>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME} - Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginPage login={login} error={loginError} />
    </div>
  )
}

export default Login
