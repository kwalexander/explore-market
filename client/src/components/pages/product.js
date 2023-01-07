import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ProductCards from '../search/SearchCards';


function Products() {
    return (
        <Container>
            <Row>
                <Col>
                    <form>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Search Input</Form.Label>
                            <Form.Control id="searchInput" placeholder="Enter product here" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Select Store</Form.Label>
                            <Form.Select id="storeSelect">
                                <option selected disabled>Select a store</option>
                                <option>Amazon</option>
                                <option>Target</option>
                                <option>Walmart</option>
                            </Form.Select>
                        </Form.Group>
                        <Button type="submit">Submit</Button>
                    </form>
                </Col>
            </Row>


            <Row>
                <Col>
                    <h1>Product Results</h1>
                    <ProductCards>
                        {/* product cards components fill here */}
                    </ProductCards>
                </Col>
            </Row>
        </Container>
    )
}

export default Products;