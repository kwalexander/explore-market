import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import myAvtar from '../../assets/images/MyAvtar.png'
import Tilt from 'react-parallax-tilt'
import { AiFillGithub } from 'react-icons/ai'
import { FaLinkedinIn } from 'react-icons/fa'

function Home2 () {
  return (
    <Container fluid className='home-skills-section' id='skills'>
      <Container>
        <Row>
          <Col data-testid="home-page-introduce" md={8} className='home-skills-description'>
            <h1  style={{ fontSize: '2.6em' }}>
              LET Us <span className='purple'> INTRODUCE </span> Ourselves
            </h1>
            <ul className='home-skills-social-links list-group'>
             
              <li data-testid="connect-via-icons" id='dev-team' class="list-group-item">
              <p>Kabir Faisal</p>
                <a
                  data-testid="connect-via-gitHub"
                  href='https://github.com/kabirfaisal1'
                  target='_blank'
                  rel='noreferrer'
                  className='icon-colour  home-dev-team'
                >
                  <AiFillGithub />
                </a>
                 <a
                   data-testid="connect-via-linkedin"
                  href='http://www.linkedin.com/in/kabirfaisal89'
                  target='_blank'
                  rel='noreferrer'
                  className='icon-colour  home-dev-team'
                >
                  <FaLinkedinIn />
                </a>
              </li>
             <li data-testid= "connect-via-icons" id='dev-team' class="list-group-item">
             <p>Dev 2</p>
                <a
                  data-testid="connect-via-gitHub"
                  href='https://github.com/kabirfaisal1'
                  target='_blank'
                  rel='noreferrer'
                  className='icon-colour  home-dev-team'
                >
                  <AiFillGithub />
                </a>
              <a
                   data-testid="connect-via-linkedin"
                  href='http://www.linkedin.com/in/kabirfaisal89'
                  target='_blank'
                  rel='noreferrer'
                  className='icon-colour  home-dev-team'
                >
                  <FaLinkedinIn />
                </a>
              </li>
            <li data-testid= "connect-via-icons" id='dev-team' class="list-group-item">
            <p>Dev 3</p>
                <a
                  data-testid="connect-via-gitHub"
                  href='https://github.com/kabirfaisal1'
                  target='_blank'
                  rel='noreferrer'
                  className='icon-colour  home-dev-team'
                >
                  <AiFillGithub />
                </a>
             <a
                   data-testid="connect-via-linkedin"
                  href='http://www.linkedin.com/in/kabirfaisal89'
                  target='_blank'
                  rel='noreferrer'
                  className='icon-colour  home-dev-team'
                >
                  <FaLinkedinIn />
                </a>
              </li>
            <li data-testid= "connect-via-icons" className='dev-team'>
            <p>Dev 4</p>
                <a
                  data-testid="connect-via-gitHub"
                  href='https://github.com/kabirfaisal1'
                  target='_blank'
                  rel='noreferrer'
                  className='icon-colour  home-dev-team'
                >
                  <AiFillGithub />
                </a>
             <a
                   data-testid="connect-via-linkedin"
                  href='http://www.linkedin.com/in/kabirfaisal89'
                  target='_blank'
                  rel='noreferrer'
                  className='icon-colour  home-dev-team'
                >
                  <FaLinkedinIn />
                </a>
              </li>
            
            </ul>
          </Col>
          <Col data-testid="home-page-avtar" md={4} id='myAvtar'>
            <Tilt>
              <img
                src={myAvtar}
                width='200'
                height='200'
                className='img-fluid'
                alt='avatar'
              />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className='home-skills-social'>
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className='purple'>connect </span>with me
            </p>
            
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
export default Home2
