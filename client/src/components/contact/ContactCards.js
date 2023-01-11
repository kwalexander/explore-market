import React from "react";
import { Container, Col, Form, Button, Row } from 'react-bootstrap'
// import Avatar from "./Avatar";
// import Details from "./Details";
import Contacts from "./Contacts";

function ContactCards() {
    <>
        <Container
            id='search-results-container'
            className='row justify-content-lg-center'
        >
            {
                Contacts.map((item, index) => {
                    return (
                        <Row>
                            <Col className="card" key={index}>
                                <div className="top">
                                    <h2 className="name">{item.name}</h2>
                                    <img src={item.image} />
                                </div>
                                <div className="bottom">
                                    <p>{item.gitHub}</p>
                                </div>
                            </Col>
                        </Row>
                    );
                }
                )
            }
        </Container>
    </>
};


export default ContactCards;
