import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import LoginCard from './LoginCard'
import SignupCard from './SignUpCard'
import Particle from '../Particle'

var LoginIcon =
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Fimgbin.com%2Fpng%2FLEcDwkev%2Fweb-design-icon-login-icon-png&psig=AOvVaw2egsavpHb2ztQL4X4xZbFf&ust=1672339485780000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCPCa8Zn8nPwCFQAAAAAdAAAAABAF'

var SignupIcon =
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fpng-zicty&psig=AOvVaw3AIdNXkKajZ3_o1U_AZ8mX&ust=1672339553713000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCKjwo7r8nPwCFQAAAAAdAAAAABAF'

function LoginPage() {
  return (
    <Container fluid className='project-section'>
      <Particle />
      <Container>
        <h1 className='project-heading'>
        User <strong className='purple'>File </strong>
        </h1>
       
        <Row
          data-test-id='Login-Card'
          style={{ justifyContent: 'center', paddingBottom: '10px' }}
        >
          <Col md={4} className='Login-Cards'>
            <LoginCard
              imgPath={LoginIcon}
              buttonLoginTitle='Enter'
              LoginTitle='Log In'
              login_name='User Name '
              login_phone_number='Phone Number :'
              login_password='Password '
            />
          </Col>
          
          <Col md={4} className='Login-Card'>
            <SignupCard
              imgPath={SignupIcon}
              signup_title='Sign Up :'
              name='Full Name :'
              email='Email :'
              createPassword='Password :'
              SignUpButtonTitle='Create Account'
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}
export default LoginPage;