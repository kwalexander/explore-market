import React from 'react'
import { Container, Card, CardColumns, Button, Row } from 'react-bootstrap'
import aboutUs from './aboutUsData'
import {AiFillGithub,AiFillLinkedin} from "react-icons/ai";
import {RiProfileLine} from "react-icons/ri";
function AboutUs () {
  return (
    <div style={{fontSize:'large'}}>
    <Container fluid className='search-content'>
      <h1 className='product-section'>
        Master <strong className='purple'>minds </strong>
      </h1>
      <br></br>
      <p className='about-us-greeting'style={{fontSize:'xx-large'}}>
        Meet the people worked to bring you faster 
         <strong className='purple'> shopping </strong>
        experience
      </p>
      <br></br>
      <CardColumns  className='aboutUs-CardColumns'>
        {aboutUs.cardData.map((team, index) => {
          return (
            <Card
              key={index}
              data-test-id='Testing 1'
              className='aboutUs-card-view'
            >
              <Card.Img variant='top' src={team.imgURL} alt='card-img' />
              <Card.Body className='about-us-card'>
                <Card.Title>{team.name}</Card.Title>
                <Card.Text className="about-me-text" style={{ textAlign: 'center' }}>{team.aboutMe}</Card.Text>
              </Card.Body>
              <a 
                variant='primary'
                href={team.portfolio}
                target='_blank'
                style={{ marginLeft: '10px' }}
              >  <RiProfileLine /> &nbsp; Portfolio
              </a>

              <a
                variant='primary'
                href={team.linkedin}
                target='_blank'
                style={{ marginLeft: '10px' }}
              >
                    <AiFillLinkedin /> &nbsp; Linkedin
              </a>
              <a
                variant='primary'
                href={team.gitHub}
                target='_blank'
                style={{ marginLeft: '10px' }}
              >
                <AiFillGithub /> &nbsp; GitHub
              </a>
            </Card>
          )
        })}
      </CardColumns>
    </Container>
    </div>
  )
};

export default AboutUs;
