import React, {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import { MdCreate} from 'react-icons/md'
// import { checkPassword, validateEmail } from '../../utils/UserFilehelpers'

import Auth from '../../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER } from '../../utils/mutations';


const SignUpCard = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({username: "", email: "", password: "" });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  // define mutation for adding a user
  const [createUser] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    console.log(userFormData);

    try {
      const { data } = await createUser({
        variables: { ...userFormData }
      });

      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        {/* <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert> */}

        <Form.Group>
          <Form.Label htmlFor="username">User name</Form.Label>
          <Form.Control
            data-testid="signup-name-input"
            type='text'
            placeholder='Your full name'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>
        <br></br>
        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
           data-testid="signup-email-input"
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>
        <br></br>
        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            data-testid="signup-password-input"
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <br></br>
        <Button
           data-testid="signup-form-submit-button"
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          <MdCreate /> &nbsp;
          Crate Account
        </Button>
      </Form>
    </>
  );
};

export default SignUpCard;

