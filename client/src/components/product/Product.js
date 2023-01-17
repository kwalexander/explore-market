import React, { useState, useEffect } from 'react'
import { Container, Col, Form, Button, Row } from 'react-bootstrap'
import Auth from '../../utils/auth'
import ProductCards from '../search/SearchCards'
import { searchProduct } from '../../utils/API'
import { saveProductIds, getSavedProductIds } from '../../utils/localStorage'
import { useMutation } from '@apollo/client'
import { SAVE_PRODUCT } from '../../utils/mutations'
import { GET_ME } from '../../utils/queries'

import { CgWebsite } from 'react-icons/cg'
import { MdFavorite } from 'react-icons/md'

function Product () {
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('')
  // create state for holding returned google api data
  const [searchedProducts, setSearchedProducts] = useState([])
  //create state to display on # product at a time
  const [visible, setVisible] = useState(4)

  //create state to loading until fetching data is return
  const [canSubmit, setcanNOTSubmit] = useState(true)

  // create state to hold saved productId values
  const [savedProductIds, setSavedProductIds] = useState(getSavedProductIds())

  // define the save product function from the mutation
  const [saveProduct] = useMutation(SAVE_PRODUCT)

  // set up useEffect hook to save `savedProductIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveProductIds(savedProductIds)
  })

  // create method to search for products and set state on form submit
  const handleFormSubmit = async event => {
    event.preventDefault()

    if (!searchInput) {
      console.log("can't be empty")
      return false
    }

    try {
      setcanNOTSubmit(false)
      document.querySelector('#submit-button').disabled = true

      const response = await searchProduct(searchInput)

      if (response.error) {
        throw new Error('something went wrong!')
      } else {
        document.querySelector('#submit-button').disabled = false
      }
      setSearchedProducts(response)

      if(response.length >4)
      {
        document.querySelector("#product-loadMore-button").style.setProperty("visibility", "visible");;
      }
      setSearchedProducts(response)

      setcanNOTSubmit(true)
      setSearchInput('')
    } catch (err) {
      console.error(err)
    }
  }
  // create function to handle saving a product to our database
  const handleSaveProduct = async productId => {
    // find the product in `searchedProducts` state by the matching id
    const productToSave = searchedProducts.find(
      product => product.productId === productId
    )
    console.log(productToSave)
    const productVars = {
      title: productToSave.title,
      description: productToSave.product_rating,
      productID: productToSave.productid,
      image: productToSave.product_img,
      forSale: productToSave.sale_price,
      link: productToSave.product_Link
    }
    console.log(productVars)
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null

    if (!token) {
      return false
    }

    try {
      await saveProduct({ variables: { product: productVars } })
      //   update: cache => {
      //     const { me } = cache.readQuery({ query: GET_ME })
      //     // console.log(me)
      //     // console.log(me.savedProducts)
      //     cache.writeQuery({
      //       query: GET_ME,
      //       data: {
      //         me: { ...me, savedProducts: [...me.savedProducts, productToSave] }
      //       }
      //     })
      //   }
      // })

      // // if product successfully saves to user's account, save product id to state
      // setSavedProductIds([...savedProductIds, productToSave.productId])
    } catch (err) {
      console.error(err)
    }
  }
  const showMoreItems = () => {
    console.log('loading more + 4')
    setVisible(prevValue => prevValue + 2)
  }
  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      {/* <Particle /> */}
      <div>
        <h1 className='product-section' style={{ color: 'white' }}>
          Let's find <strong className='purple'>Product </strong>
        </h1>
        <Container
          fluid
          className='search-content'
          style={{
            marginLeft: '4em',
            marginRight: 'auto',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={e => setSearchInput(e.target.value)}
                  type='text'
                  placeholder='Search for a product by name'
                />
              </Col>
              <Col xs={12} md={8}>
                <Button
                  id='submit-button'
                  type='submit'
                  variant='success'
                  size='lg'
                >
                  {canSubmit ? 'Submit Search' : 'Patience is virtue'}
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </div>

      <Container>
        <p style={{ color: 'white' }}></p>
        <h2 style={{ color: 'white' }}>
          {searchedProducts.length
            ? `Here are the ${searchedProducts.length} product results of your search.`
            : 'Search for a product to begin'}
        </h2>
        <br></br>
        <br></br>
        <br></br>

        <Container
          id='search-results-container'
          className='row justify-content-lg-center'
        >
          {searchedProducts.slice(0, visible).map(product => {
            return (
              <Col
                id='search-results-cards'
                className='col-11 col-md-6 col-lg-3 mx-0 md-5'
              >
                <ProductCards
                  key={product.productid}
                  id={product.productid}
                  imgPath={product.product_img}
                  isBlog={false}
                  title={product.title}
                  price={product.sale_price}
                />
                {Auth.loggedIn() && (
                  <Col>
                    <Button
                      disabled={savedProductIds?.some(
                        savedProductId => savedProductId === product.productId
                      )}
                      className='btn-block btn-info'
                      onClick={() => handleSaveProduct(product.productId)}
                    >
                      <MdFavorite /> &nbsp;
                      {savedProductIds?.some(
                        savedProductId => savedProductId === product.productId
                      )
                        ? 'This product has been saved!'
                        : 'Save this Product!'}
                    </Button>

                    <Button
                      variant='primary'
                      href={product.product_Link}
                      target='_blank'
                      style={{ marginLeft: '10px' }}
                    >
                      <CgWebsite /> &nbsp; Site Link
                    </Button>
                  </Col>
                )}
              </Col>
            )
          })}

          <br></br>
          <Button 
          id="product-loadMore-button"
          data-testid="results-load-more" 
          onClick={showMoreItems}>Load More</Button>
        </Container>
      </Container>
    </>
  )
}

export default Product
