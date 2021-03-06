import React, { useState, useEffect } from 'react'
import { validateEmail } from '../../../config/utils'
import { theme } from '../../../config/theme'
import { ToastsStore } from 'react-toasts'
import { Button } from '../../../components/Button/index'
import { Container, FormInput } from '../../../config/commonStyles'
import {
  LoginColumn,
  SwitchModeDiv,
  SwitchModeLink,
  RequiredLabel,
  Form,
  FormGroup,
  ButtonContainer,
  InputLable,
  Paragraph
} from '../styled'

export const Signup = ({
  history,
  registerUser,
  clearError,
  clearNewUser,
  errorMessage,
  newUser
}) => {
  // local state
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // lifecycle hooks
  useEffect(
    () => {
      if (newUser) {
        ToastsStore.success(
          'Account created successfully, login and start using now!'
        )
        history.push('/login')
        clearNewUser()
      }
    },
    [newUser], // eslint-disable-line
  )
  if (errorMessage.length !== 0) {
    ToastsStore.error(errorMessage)
    clearError()
  }
  // local helper methods
  const handleSignupBtnClick = () => {
    if (username.trim().length === 0) {
      ToastsStore.error('username can not be empty')
      setPassword('')
    } else if (email.trim().length !== 0 && !validateEmail(email.trim())) {
      ToastsStore.error('Invalid Email address format')
      setPassword('')
    } else if (password.trim().length === 0) {
      ToastsStore.error('password can not be empty')
    } else if (password.trim().length < 4) {
      ToastsStore.error('minimum password length is 5')
      setPassword('')
    } else {
      registerUser({ username: username, email: email, password: password })
      setPassword('')
    }
  }
  const handleTextInputChange = event => {
    if (event.target.id === 'inputUsername') {
      setUsername(event.target.value)
    } else if (event.target.id === 'inputEmail') {
      setEmail(event.target.value)
    } else if (event.target.id === 'inputPassword') {
      setPassword(event.target.value)
    }
  }
  return (
    <Container>
      <LoginColumn sm={{ span: 5, offset: 4 }}>
        <Form>
          <FormGroup>
            <RequiredLabel htmlFor='inputUsername'>Username</RequiredLabel>
            <FormInput
              type='text'
              value={username}
              id='inputUsername'
              placeholder='Enter Username'
              onChange={handleTextInputChange}
              paddingHorizontal='.4rem'
              width='90%'
              borderColor={theme.lightGray}
            />
          </FormGroup>
          <FormGroup>
            <InputLable htmlFor='inputEmail'>Email address</InputLable>
            <FormInput
              type='email'
              value={email}
              id='inputEmail'
              placeholder='Enter email'
              onChange={handleTextInputChange}
              paddingHorizontal='.4rem'
              width='90%'
              borderColor={theme.lightGray}
            />
          </FormGroup>
          <FormGroup>
            <RequiredLabel htmlFor='inputPassword'>Password</RequiredLabel>
            <FormInput
              type='password'
              value={password}
              id='inputPassword'
              placeholder='Password'
              onChange={handleTextInputChange}
              paddingHorizontal='.4rem'
              width='90%'
              borderColor={theme.lightGray}
            />
          </FormGroup>
        </Form>
        <ButtonContainer sm={{ span: 6, offset: 3 }}>
          <Button
            backgroundColor={theme.buttonBackground}
            hoverBackground={theme.buttonHover}
            onClick={() => handleSignupBtnClick()}
          >
            Signup
          </Button>
        </ButtonContainer>
        <SwitchModeDiv>
          <Paragraph>Already have an account?</Paragraph>
          <SwitchModeLink onClick={() => history.push('/login')}>
            Login
          </SwitchModeLink>
        </SwitchModeDiv>
      </LoginColumn>
    </Container>
  )
}
