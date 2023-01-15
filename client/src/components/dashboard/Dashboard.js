import React from 'react';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { Container, Col, Form, Button, Row } from 'react-bootstrap';
import ProductCards from '../search/SearchCards';

function Dashboard (props) {

    const  { loading, data }  = useQuery(GET_ME);
    console.log(data);

    return (
        <>

        { loading ? (
            <h1> Loading ... </h1>
        ) : (
            <>
            <p className='about-us-greeting mt-5'style={{fontSize:'xx-large'}}>
        Hello
         <strong className='purple'> {data.me.username} </strong>
         , here are your saved items
      </p>
            <h1 className='product-section' style={{ color: 'white' }}>
        Saved <strong className='purple'>Products </strong>
        </h1>
            { data.me.savedProduct.length ? (
                <>
                <Container>
                    <Row>
                {data.me.savedProduct.map(product => {
                return (
                    <Col 
                        className='col-3'
                        key={product._id}
                        >
                            <ProductCards
                                id={product._id}
                                imgPath={product.image}
                                isBlog={false}
                                title={product.title}
                                price={product.forSale}
                            />
                            <Button
                                variant='primary'
                                href={product.link}
                                target='_blank'
                                style={{ marginLeft: '10px' }}
                            >
                                Site Link
                            </Button>
                    
                    </Col>
                )})}
            </Row>
            </Container>
            </>
            ) : (
                <h2>no saved products yet</h2>
            )}
             <h1 className='product-section' style={{ color: 'white' }}>
        Saved <strong className='purple'>Trips </strong>
        </h1>
            { data.me.savedTravel.length ? (
                <>
                <Container>
                    <Row>
                {data.me.savedTravel.map(trip => {
                return (
                    <Col 
                    className='col-3'
                    key={trip._id}
                    >
                        <ProductCards
                            id={trip._id}
                            imgPath={trip.leavingFrom}
                            isBlog={false}
                            title={trip.airWays}
                            price={trip.goingTo}
                        />
                        <Button
                            variant='primary'
                            href={trip.link}
                            target='_blank'
                            style={{ marginLeft: '10px' }}
                        >
                            Site Link
                        </Button>
                    </Col>
                )
            })
         }
         </Row>
         </Container>
         </>
         ) : (
                <h2>no saved trips yet</h2>
            )}
            </>
        )}
        </>
    )
};

export default Dashboard;