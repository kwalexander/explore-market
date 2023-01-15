import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {AiFillGithub,AiFillLinkedin} from "react-icons/ai";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (

    <Container data-testid="portfolio-footer" fluid className="footer">
          
      <br></br>
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Kabir Faisal, Cameron Kopp, Kaspar Alexander, Gladi Vill</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} project 3</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="dev-team">
              <a
                href="https://github.com/kwalexander/explore-market.git"
                style={{ color: "white" }}
                target="_blank" 
            
              >
                <AiFillGithub />
              </a>
            </li>
          
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
