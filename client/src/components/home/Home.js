import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../assets/images/MyPhoto.png";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 data-testid="homepage-header-greeting" style={{ paddingBottom: 15 }} className="heading">
                hello Friends{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 data-testid="homepage-header-for-name" className="heading-name">
                TDB
                <strong className="main-name"> TBD</strong>
              </h1>

              <div data-testid="homepage-typeWriter" style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col  md={5} style={{ paddingBottom: 20 }}>
              <img
                data-testid="my-homepage-pic"
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;