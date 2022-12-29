import React, {useState} from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { MdCreate, MdNearbyError} from 'react-icons/md'
import { checkPassword, validateEmail } from '../../utils/UserFilehelpers'

function SignUpCard (props) {
  // Create state variables for the fields in the form
  // We are also setting their initial values to an empty string
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    // Based on the input type, we set the state of either email, username, and password
    if (inputType === 'email') {
      setEmail(inputValue);
    } else if (inputType === 'userName') {
      setUserName(inputValue);
    } else {
      setPassword(inputValue);
    }
  };

  const handleFormSubmit = (e) => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    e.preventDefault();
    document.querySelector('#useNameError').style.setProperty("visibility", "hidden");
    document.querySelector('#emailError').style.setProperty("visibility", "hidden");
    document.querySelector('#passwordError').style.setProperty("visibility", "hidden");
     
    // First we check to see if the email is not valid or if the userName is empty. If so we set an error message to be displayed on the page.
    if (!validateEmail(email) && !userName) {
      setErrorMessage('Email or username is invalid');
      document.querySelector('#useNameError').style.setProperty("visibility", "visible");
      document.querySelector('#emailError').style.setProperty("visibility", "visible");
    
      // We want to exit out of this code block if something is wrong so that the user can correct it
      return;
      // Then we check to see if the password is not valid. If so, we set an error message regarding the password.
    }
    if(!userName){
      setErrorMessage('Username is invalid');
      document.querySelector('#useNameError').style.setProperty("visibility", "visible");
    }
    if (!validateEmail(email) || !userName) {
      setErrorMessage('Email is invalid');
      document.querySelector('#emailError').style.setProperty("visibility", "visible");
      // We want to exit out of this code block if something is wrong so that the user can correct it
      return;
      // Then we check to see if the password is not valid. If so, we set an error message regarding the password.
    }
    if(password == userName || password==userName.replace(/ /g, "")){
      setErrorMessage(
        `Password can't be same a username: ${userName}`
      );
    }
    if (!checkPassword(password)) {
      setErrorMessage(
        `Choose a more secure password for the account: ${userName}`
      );
      document.querySelector('#passwordError').style.setProperty("visibility", "visible");
      return;
    }
    alert(`Hello ${userName}`);

    // If everything goes according to plan, we want to clear out the input after a successful registration.
    setUserName('');
    setPassword('');
    setEmail('');
  };



  return (
    <Card data-test-id={props.signup_title} className='Login-Cards-view'>
      <Card.Img variant='top' src={props.imgPath} alt='card-img' />
      <Card.Body>
        <Card.Title>{props.signup_title}</Card.Title>
        <Card.Text style={{ textAlign: 'justify' }}></Card.Text>
        <Form>
          <div class='form-group'>
            <label>{props.name} </label>
            <input 
            type='text'
            value={userName} 
            id="userName" 
            class="form-control" 
            name='userName' placeholder='enter full name'
            onChange={handleInputChange} 
            required />
             <div id="useNameError"> 
            <MdNearbyError /> &nbsp;
            <small 
            id="useNamedHelp">User name can't be 
            <strong > 'empty'</strong> </small>
           </div>
          </div>
          <br></br>

          <div class='form-group'>
            <label>{props.email} </label>
            <input 
            type='email' 
            value={email}
            class="form-control" 
            name='email' 
            placeholder='enter email'
            onChange={handleInputChange} />
           <div id="emailError"> 
            <MdNearbyError /> &nbsp;
            <small 
            id="emailHelp">you are missing <strong > '@'</strong></small>
           </div>
          </div>
          <br></br>
          <div class='form-group'>
            <label>{props.createPassword}</label>
            <input 
            type='password' 
            class="form-control" 
            name='password' 
            value={password}
            placeholder='enter password'
            onChange={handleInputChange} />
            <div id="passwordError"> 
            <MdNearbyError /> &nbsp;
            <small 
            id="passwordHelp">password needs to be between <strong >7 to 16 </strong></small>
           </div>
         
          </div>
        </Form>
        {errorMessage && (
        <div>
          <p className="error-text">{errorMessage}</p>
        </div>
      )}
        <br></br>
        <Button type='button' onClick={handleFormSubmit} href={props.ghLink} target='_blank'>
          <MdCreate /> &nbsp;
          {props.SignUpButtonTitle}
        </Button>
         <br></br>
      </Card.Body>
    </Card>
  )
}
export default SignUpCard
