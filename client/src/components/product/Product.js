import React, { useState, useEffect } from 'react'
import { Container, Col, Form, Button, Row } from 'react-bootstrap'
import Auth from '../../utils/auth'
import ProductCards from '../search/SearchCards'
import { searchProduct } from '../../utils/API'
import { saveProductIds, getSavedProductIds } from '../../utils/localStorage'
import { useMutation } from '@apollo/react-hooks'
import { SAVE_PRODUCT } from '../../utils/mutations'
import { GET_ME } from '../../utils/queries'
import Particle from '../Particle'
// import data from '../../utils/data'
import { MdFavorite } from 'react-icons/md'

function Product() {
  // create state for holding returned google api data
  const [searchedProducts, setSearchedProducts] = useState([])

  // const fetchProducts = async () => {
  //   const response = await fetch(/*get request*/)
  //   const json = await response.json();
  //   setSearchedProducts(json);
  // }

  // useEffect(() => {
  //   fetchProducts();
  // }, [])

  //data.map((item, index))

  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('')

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
    console.log(searchInput)
    try {
      const response = await searchProduct(searchInput)

      // if (!response.ok) {
      //   throw new Error('something went wrong!')
      // }
      console.log("got response back " )
      console.log(response )

      //   const { items } = await response.json()
      //  console.log(items);
      // const productData =  items.map(product => ({
        
      //   title: product.title,
      //   price: product.sale_price,
      //   image: product.product_img || ''
      // }))
        // const fetchProducts = async (searchInput) => {
        //   const response = await searchProduct(searchInput)
        //   // const json = await response.json();
        //   setSearchedProducts(response);
        // }
      // useEffect(() => {
      //   fetchProducts();
      // }, [])
      setSearchedProducts(response)
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

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null

    if (!token) {
      return false
    }

    try {
      await saveProduct({
        variables: { product: productToSave },
        update: cache => {
          const { me } = cache.readQuery({ query: GET_ME })
          // console.log(me)
          // console.log(me.savedProducts)
          cache.writeQuery({
            query: GET_ME,
            data: {
              me: { ...me, savedProducts: [...me.savedProducts, productToSave] }
            }
          })
        }
      })

      // if product successfully saves to user's account, save product id to state
      setSavedProductIds([...savedProductIds, productToSave.productId])
    } catch (err) {
      console.error(err)
    }
  }

  // create function to handle loadmore button
  const [noOfElement, setnoofElement] = useState(4)
  const loadMore = () => {
    setnoofElement(noOfElement + noOfElement)
  }
  // const slice = data.cardData.slice(0, noOfElement)

  return (
    <>
      <br></br>
        <Particle />
        <Container fluid className='search-content'>
          <h1 className='product-section'>
            Lets find <strong className='purple'>Product </strong>
          </h1>
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
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>

        </Container>

      <Container>
        <p style={{ color: 'white' }}>

        </p>
        <h2
          style={{ color: 'white' }}
        >
          {searchedProducts.length
            ? `Here are the ${searchedProducts.length} product results of your search.`
            : 'Search for a product to begin'}
        </h2>
        <Container
          id='search-results-container'
          className='row justify-content-lg-center'
        >
        
          {searchedProducts.map(product => {
          return (
            <Row
              key={product.productid}
              data-test-id='product-cards-row'
              style={{ justifyContent: 'center', paddingBottom: '10px' }}
            >
              <Col md={4} className='product-cards'>
                <ProductCards
                  id={product.productid}
                  imgPath={product.product_img}
                  isBlog={false}
                  title={product.title}
                  price={product.sale_price}
                  siteLink={product.product_Link}
                />
                {/* {Auth.loggedIn() && (
                  <Button
                    disabled={savedProductIds?.some(
                      savedProductId => savedProductId === product.productId
                    )}
                    className='btn-block btn-info'
                    onClick={() => handleSaveProduct(product.productId)}
                  >
                    {savedProductIds?.some(
                      savedProductId => savedProductId === product.productId
                    )
                      ? 'This product has been saved!'
                      : 'Save this Product!'}
                  </Button>
                )} */}
              </Col>
            </Row>
          )
        })}
        </Container>
        <br></br>
        <Button onClick={() => loadMore()}>Load More</Button>
      </Container>
    </>
  )
}

export default Product
