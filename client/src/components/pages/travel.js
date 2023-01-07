import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import TripCards from '../search/TripCards';


function Trips() {
    return (
        <Container>
            <Row>
                <Col>
                    <form>
                        <Form.Group className="mb-3">
                            <Form.Label>Trip Search Input</Form.Label>
                            <Form.Control id="searchInput" placeholder="Enter trip name here" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Or select radius</Form.Label>
                            <Form.Select id="radiusSelect">
                                <option selected disabled>Select a mile radius</option>
                                <option>5 miles</option>
                                <option>10 miles</option>
                                <option>50 miles</option>
                            </Form.Select>
                        </Form.Group>
                        <Button type="submit">Submit</Button>
                    </form>
                </Col>
            </Row>


            <Row>
                <Col>
                    <h1>Trip Results</h1>
                    <TripCards>
                        {/* travel cards components fill here */}
                    </TripCards>
                </Col>
            </Row>
        </Container>
    )
}

export default Trips;