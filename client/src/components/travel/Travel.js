import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TravelCards  from "../search/SearchCards";
import Particle from "../Particle";




function Travel() {
  return (
    <Container fluid className="home-section">
      <Particle />
      <Container>
        <h1 className="home-section">
          Lets find <strong className="purple">Travels </strong>
        </h1>
        
        <p style={{ color: "white" }}>
          Here are Travel results of your search .
        </p>
        <Row data-test-id="Travel-cards" style={{ justifyContent: "center", paddingBottom: "10px" }}>
     
          <Col md={4} className="Travel-card">
            <TravelCards
              imgPath=""
              isBlog={false}
              title="JavaScript Quiz"
              description="Worked on a application that build a timed coding quiz with multiple-choice questions for javascript. This app will run in the browser, and will feature dynamically updated HTML and CSS powered by JavaScript code and store users score in localStorage."
              ghLink="https://github.com/kabirfaisal1/JavaScriptQuiz.git"
              siteLink="https://kabirfaisal1.github.io/JavaScriptQuiz/"   
            />
          </Col>

          
        </Row>
      </Container>
    </Container>
  );
}

export default Travel;
