import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap'
import SignUpForm from './login/SignUpCard'
import LoginForm from './login/LoginCard'
import Auth from '../utils/auth'
import logo from '../assets/images/avatar.png'
//Testing
import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineTeam,
  AiOutlineUserAdd,
  AiOutlineContacts
} from 'react-icons/ai'

import {
  SiYourtraveldottv,
  SiProducthunt
} from 'react-icons/si'

import {
  IoMdLogOut
} from 'react-icons/io'

function NavBar() {
  const [navColour, updateNavbar] = useState(false)
  // set modal display state
  const [showModal, setShowModal] = useState(false)

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true)
    } else {
      updateNavbar(false)
    }
  }

  window.addEventListener('scroll', scrollHandler)

  return (
    <div >
      <Navbar
        expanded={showModal}
        fixed='top'
        expand='md'
        className={navColour ? 'sticky' : 'navbar'}
      >
        <Container>
          <Navbar.Brand data-testid='app-logo' className='d-flex'>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />

          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='ms-auto' defaultActiveKey='#home'>

              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link
                    data-testid='nav-dashboard'
                    as={Link}
                    to={'/dashboard'}
                    onClick={() => setShowModal(false)}
                  >
                    <AiOutlineHome style={{ marginBottom: '2px' }} /> Dashboard
                  </Nav.Link>

                  <Nav.Link
                    data-testid='nav-product'
                    as={Link}
                    to='/Product'
                    onClick={() => setShowModal(false)}
                  >
                    <SiProducthunt
                      style={{ marginBottom: '2px' }}
                    />{' '}
                    Product
                  </Nav.Link>
                  <Nav.Link
                    data-testid='nav-product'
                    as={Link}
                    to='/Travel'
                    onClick={() => setShowModal(false)}
                  >
                    <SiYourtraveldottv
                      style={{ marginBottom: '2px' }}
                    />{' '}
                    Travel
                  </Nav.Link>

                  <Nav.Link
                    data-testid='nav-logout'
                    onClick={Auth.logout}>

                    <IoMdLogOut style={{ marginBottom: '2px' }} /> Logout
                  </Nav.Link>

                </>
              ) : (
                <div style={{ fontSize: '1.4em', color:'purple', display:'flex', marginLeft:'auto', marginRight:'auto' }} >
                  <Nav.Link
                    data-testid='nav-home'
                    as={Link}
                    to={'/'}
                    onClick={() => setShowModal(false)}
                  >
                    <AiOutlineHome style={{ marginBottom: '2px', color:'purple' }} /> Home 
                  </Nav.Link>


                  <Nav.Link
                    data-testid='nav-product'
                    as={Link}
                    to='/AboutUs'
                    onClick={() => setShowModal(false)}
                  >
                    <AiOutlineTeam
                      style={{ marginBottom: '2px', color:'purple' }}
                    />{' '}
                    About Us
                  </Nav.Link>



                  <Nav.Link data-testid="login_or_signUp" onClick={() => setShowModal(true)}>
                    <AiOutlineUserAdd style={{  color: 'white' }} />{' '}
                    <AiFillStar style={{  color:'white' }} />
                  </Nav.Link>
                </div>

              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        data-testid="popUp-login-signUp"
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>

                <Nav.Link data-testid="login-module" eventKey='login'>Login</Nav.Link>


                <Nav.Link data-testid="sign-module" eventKey='signup'>Sign Up</Nav.Link>

              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </div>
  );
};

export default NavBar
