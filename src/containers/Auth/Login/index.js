import React, { useState, useEffect } from 'react'
import { ToastsStore } from 'react-toasts'
import { theme } from '../../../config/theme'
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
  Paragraph
} from '../styled'

export const Login = ({
  history,
  loginUser,
  clearError,
  errorMessage,
  auth
}) => {
  // local state
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // lifecycle hooks
  useEffect(
    () => {
      if (auth) {
        history.push('/igconnect')
      }
    },
    [auth], // eslint-disable-line
  )
  if (errorMessage.length !== 0) {
    ToastsStore.error(errorMessage)
    clearError()
  }
  // local helper methods
  const handleLoginBtnClick = () => {
    if (username.trim().length === 0) {
      ToastsStore.error('username can not be empty')
    } else if (password.trim().length === 0) {
      ToastsStore.error('password can not be empty')
    } else {
      loginUser({ username: username, password: password })
      setPassword('')
    }
  }
  const handleTextInputChange = event => {
    if (event.target.id === 'inputUsername') {
      setUsername(event.target.value)
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
            onClick={() => handleLoginBtnClick()}
          >
            Login
          </Button>
        </ButtonContainer>
        <SwitchModeDiv>
          <Paragraph>Don't have an account?</Paragraph>
          <SwitchModeLink onClick={() => history.push('/signup')}>
            Signup
          </SwitchModeLink>
        </SwitchModeDiv>
      </LoginColumn>
    </Container>
  )
}
