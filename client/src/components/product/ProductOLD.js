import React, { useState, useEffect } from 'react';
import {Container, Col, Form, Button, Card } from 'react-bootstrap';
import Auth from '../../utils/auth';
import ProductCards  from "../search/SearchCards";
import { searchProduct } from '../../utils/API';
import { saveProductIds, getSavedProductIds } from '../../utils/localStorage';
import { useMutation } from '@apollo/react-hooks';
import {SAVE_PRODUCT} from '../../utils/mutations';
import { GET_ME } from '../../utils/queries';

function Product(){
  // create state for holding returned google api data
  const [searchedProducts, setSearchedProducts] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved productId values
  const [savedProductIds, setSavedProductIds] = useState(getSavedProductIds());

  // define the save product function from the mutation
  const [saveProduct] = useMutation(SAVE_PRODUCT)

  // set up useEffect hook to save `savedProductIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveProductIds(savedProductIds);
  });

  // create method to search for products and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchProduct(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const productData = items.map((product) => ({
        productId: product.id,
        title: product.volumeInfo.title,
        link: product.volumeInfo.infoLink,
        image: product.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedProducts(productData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a product to our database
  const handleSaveProduct = async (productId) => {
    // find the product in `searchedProducts` state by the matching id
    const productToSave = searchedProducts.find((product) => product.productId === productId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveProduct({
        variables: {product: productToSave},
        update: cache => {
          const {me} = cache.readQuery({ query: GET_ME });
          // console.log(me)
          // console.log(me.savedProducts)
          cache.writeQuery({ query: GET_ME , data: {me: { ...me, savedProducts: [...me.savedProducts, productToSave] } } })
        }
      });

      // if product successfully saves to user's account, save product id to state
      setSavedProductIds([...savedProductIds, productToSave.productId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
        <Container>
          <h1>Search for Products!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a product'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
   

      <Container>
        <h2>
          {searchedProducts.length
            ? `Viewing ${searchedProducts.length} results:`
            : 'Search for a product to begin'}
        </h2>
      
          {searchedProducts.map((product) => {
            return (
              <Card key={product.productId} border='dark'>
                {product.image ? (
                  <Card.Img src={product.image} alt={`The cover for ${product.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <p className='small'>Authors: {product.authors}</p>
                  <Card.Text>{product.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedProductIds?.some((savedProductId) => savedProductId === product.productId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveProduct(product.productId)}>
                      {savedProductIds?.some((savedProductId) => savedProductId === product.productId)
                        ? 'This product has been saved!'
                        : 'Save this Product!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
       
      </Container>
    </>
  );
};

export default Product;