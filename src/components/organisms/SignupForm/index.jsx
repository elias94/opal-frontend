import { useEffect, useState } from 'react'
import { useInput } from 'shared/hooks/input'
import Link from 'next/link'

import Input from 'components/atoms/Input'
import Title from 'components/atoms/Title'
import P from 'components/atoms/P'
import Label from 'components/atoms/Label'
import Button from 'components/atoms/Button'
import LoadingOverlay from 'components/atoms/LoadingOverlay'

import {
  Container, FormContainer, LinkEl,
} from './styles'

const USER_R = /^[A-Za-z\d_]{4,}$/
const PASSWORD_R = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
const EMAIL_R = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default function Signup({ onSignup, error, isLoading, ...props }) {
  const [inputError, setInputError] = useState(null)
  const [userValue, userBind, userReset] = useInput('')
  const [emailValue, emailBind, emailReset] = useInput('')
  const [passwordValue, passwordBind, passwordReset] = useInput('')
  const [repeatPasswordValue, repeatPasswordBind, repeatPasswordReset] = useInput('')

  useEffect(() => {
    if (error) {
      setInputError(error)
    } else {
      setInputError(null)
    }
  }, [error])

  const handleSubmit = (evt) => {
    evt.preventDefault()

    if (!USER_R.test(userValue)) {
      setInputError('Username must be longer than 4 characters, and can only contain letters, numbers and \'_\'')
      return
    }

    if (!EMAIL_R.test(emailValue)) {
      setInputError('Email is not valid.')
      return
    }

    if (!PASSWORD_R.test(passwordValue)) {
      setInputError('Password must be minimum 8 characters longer, with at least 1 number.')
      return
    }

    if (passwordValue !== repeatPasswordValue) {
      setInputError('Passwords aren\'t the same')
      return
    }

    onSignup(userValue, emailValue, passwordValue)

    passwordReset()
    repeatPasswordReset()
    setInputError(null)
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
      
      <Title head="h3" center>
        Create a new account
      </Title>

      <FormContainer onSubmit={handleSubmit}>
        <Label>Username</Label>
        <Input {...userBind} type="text" autocapitalize="off" autocorrect="off" autocomplete="username" autoFocus="autofocus" placeholder="Insert a username" />
        <Label>Email</Label>
        <Input {...emailBind} type="text" autocapitalize="off" autocorrect="off" autocomplete="email" autoFocus="autofocus" placeholder="Insert your email" />
        <Label>Password</Label>
        <Input {...passwordBind} type="password" autocomplete="current-password" placeholder="Password" />
        <Input {...repeatPasswordBind} type="password" autocomplete="current-password" placeholder="Repeat password" />
        {inputError && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md">
            <span className="text-sm">{inputError}</span>
          </div>
        )}
        <Button>Create account</Button>
      </FormContainer>
      <P center>
        Already registered? <LinkEl href="/login">Log in</LinkEl>
      </P>
    </Container>
  )
}
