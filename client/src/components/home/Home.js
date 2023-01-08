import React, { useRef } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import "./assets/style.css";
import Particle from "../Particle";




const useHover = () => {
  const ref = useRef();

  const handleMouseEnter = () => {
    ref.current.classList.add('hover-left');
  };

  const handleMouseLeave = () => {
    ref.current.classList.remove('hover-left');
  };

  return {
    ref,
    handleMouseEnter,
    handleMouseLeave
  };
};

function Home() {
  const left = useHover();
  const right = useHover();
  const container = useHover();

  return (
  
      <Container fluid className="container" ref={container.ref}>
        <Particle />
        <Container className="home-content">
          <Row>
            <Col className="split left" ref={left.ref} onMouseEnter={left.handleMouseEnter} onMouseLeave={left.handleMouseLeave}>
              <h1>Products</h1>
              <a href="#" className="btn">Search Now</a>

            </Col>

            <Col  className="split right" ref={right.ref} onMouseEnter={right.handleMouseEnter} onMouseLeave={right.handleMouseLeave}>
            <h1>Travel</h1>
             <a href="#" className="btn">Search Now</a>
            </Col>
          </Row>
        </Container>
      </Container>
  

  );
}

export default Home;