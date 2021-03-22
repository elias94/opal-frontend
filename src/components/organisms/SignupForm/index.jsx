import { useInput } from 'shared/hooks/input'

import Input from 'components/atoms/Input'
import Title from 'components/atoms/Title'
import P from 'components/atoms/P'
import Label from 'components/atoms/Label'
import Button from 'components/atoms/Button'

import { Container, FormContainer, LinkEl } from './styles'

export default function Signup({ onSignup, error }) {
  const [userValue, userBind, userReset] = useInput('')
  const [emailValue, emailBind, emailReset] = useInput('')
  const [passwordValue, passwordBind, passwordReset] = useInput('')

  const handleSubmit = (evt) => {
    evt.preventDefault()

    onSignup(userValue, emailValue, passwordValue)

    userReset()
    emailReset()
    passwordReset()
}

  return (
    <Container>
      <Title head="h3" center>
        Create an account
      </Title>
      <FormContainer onSubmit={handleSubmit}>
        <Label>Username</Label>
        <Input {...userBind} type="text" autocapitalize="off" autocorrect="off" autocomplete="username" autoFocus="autofocus" />
        <Label>Email</Label>
        <Input {...emailBind} type="text" autocapitalize="off" autocorrect="off" autocomplete="email" autoFocus="autofocus" />
        <Label>Password</Label>
        <Input {...passwordBind} type="password" autocomplete="current-password" />
        <Button>Create account</Button>
      </FormContainer>
      <P center>
        Already registered? <LinkEl href="/login">Log in</LinkEl>
      </P>
    </Container>
  )
}
