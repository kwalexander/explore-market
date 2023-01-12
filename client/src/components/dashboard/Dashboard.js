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
            <h1 className="mt-5 mb-5">Hello {data.me.username}</h1>
            <h1 className="mt-5 mb-5">Saved Products</h1>
            { data.me.savedProduct.length ? data.me.savedProduct.map(product => {
                return (
                    <Col 
                        className='col-11 col-md-6 col-lg-3 mx-0 md-5'
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
                )
            }) : (
                <h2>no saved products yet</h2>
            )}
            <h1 className="mt-5 mb-5">Saved Trips</h1>
            { data.me.savedTravel.length ? data.me.savedTravel.map(trip => {
                return (
                    <Col 
                    className='col-11 col-md-6 col-lg-3 mx-0 md-5'
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
            }) : (
                <h2>no saved trips yet</h2>
            )}
            </>
        )}
        </>
    )
};

export default Dashboard;