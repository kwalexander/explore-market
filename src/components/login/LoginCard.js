import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { HiLogin } from 'react-icons/hi'
// Here we import a helper function that will check if the email is valid
import { checkPassword, validateEmail } from '../../utils/userFilehelpers'

function LoginCard (props) {
  // Create state variables for the fields in the form
  // We are also setting their initial values to an empty string
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = e => {
    // Getting the value and name of the input which triggered the change
    const { target } = e
    const inputType = target.name
    const inputValue = target.value

    // Based on the input type, we set the state of email and password
    if (inputType === 'email') {
      setEmail(inputValue)
    } else {
      setPassword(inputValue)
    }
  }

  const handleFormSubmit = e => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault()

    // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
    if (!validateEmail(email)) {
      setErrorMessage('Email or username is invalid')
      // We want to exit out of this code block if something is wrong so that the user can correct it
      return
      // Then we check to see if the password is not valid. If so, we set an error message regarding the password.
    }
    if (!checkPassword(password)) {
      setErrorMessage(`Choose a more secure password for the account: ${email}`)
      return
    }

    // If everything goes according to plan, we want to clear out the input after a successful registration.
    setPassword('')
    setEmail('')
    alert(`Hello ${email}`)
  }

  return (
    <Card data-test-id={props.LoginTitle} className='Login-Cards-view'>
      <Card.Img variant='top' src={props.imgPath} alt='card-img' />
      <Card.Body>
        <Card.Title>{props.LoginTitle}</Card.Title>
        <Card.Text style={{ textAlign: 'justify' }}></Card.Text>
        <Form>
          <div class='form-group'>
            <label>{props.login_name}</label>
            <input
              type='email'
              name='email'
              class='form-control'
              placeholder='enter email'
              value={email}
              onChange={handleInputChange}
            />
          </div>
          <br></br>
          <div class='form-group'>
            <label>{props.login_password}</label>
            <input
              type='password'
              class='form-control'
              name='password'
              placeholder='enter password'
              value={password}
              onChange={handleInputChange}
            />
          </div>
        </Form>
        <br></br>
        {errorMessage && (
          <div>
            <p className='error-text'>{errorMessage}</p>
          </div>
        )}
        <br></br>
        <Button
          type='button'
          onClick={handleFormSubmit}
          href={props.ghLink}
          target='_blank'
        >
          <HiLogin /> &nbsp;
          {props.buttonLoginTitle}
        </Button>
      </Card.Body>
    </Card>
  )
}
export default LoginCard
