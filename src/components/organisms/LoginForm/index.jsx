import { useState } from 'react'
import { useInput } from 'shared/hooks/input'
import Link from 'next/link'

import Input from 'components/atoms/Input'
import Title from 'components/atoms/Title'
import P from 'components/atoms/P'
import Label from 'components/atoms/Label'
import Button from 'components/atoms/Button'
import LinkEl from 'components/atoms/Link'
import LoadingOverlay from 'components/atoms/LoadingOverlay'

import { Container, FormContainer } from './styles'

function LoginForm({ login, error, isLoading, ...props }) {
  const [userValue, userBind, userReset] = useInput('')
  const [passwordValue, passwordBind, passwordReset] = useInput('')

  
  const handleSubmit = (evt) => {
      evt.preventDefault()

      login(userValue, passwordValue)

      passwordReset()
  }

  return (
    <Container>
      {isLoading && <LoadingOverlay />}
      <div className="mx-auto flex flex-row justify-center items-start pb-3">
        <Link href="/">
          <h3 className="w-min text-5xl font-black tracking-tight color-gradient cursor-pointer select-none">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </h3>
        </Link>
        <span className="text-xs -mr-4 font-medium pl-1 opacity-50">beta</span>
      </div>

      <FormContainer onSubmit={handleSubmit}>
        <Label>Username</Label>
        <Input {...userBind} type="text" autocapitalize="off" autocorrect="off" autocomplete="username" autoFocus="autofocus" data-com-onepassword-filled="light" />
        <Label>Password <LinkEl href="/account_reset">Forgot password?</LinkEl></Label>
        <Input {...passwordBind} type="password" autocomplete="current-password" data-com-onepassword-filled="light" />
        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md">
            <span className="text-sm">{error}</span>
          </div>
        )}
        <Button>Log in</Button>
      </FormContainer>
      
      <P center>
        New to {process.env.NEXT_PUBLIC_APP_NAME}? <LinkEl href="/signup">Sign up</LinkEl>
      </P>
    </Container>
  )
}

export default LoginForm
