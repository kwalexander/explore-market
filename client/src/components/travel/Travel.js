import React, { useState, useEffect } from 'react'
import { Container, Col, Form, Button, Row } from 'react-bootstrap'
import Auth from '../../utils/auth'
import TravelCards from '../search/SearchCards'
import { searchTravel } from '../../utils/API'
import { saveTravelIds, getSavedTravelIds } from '../../utils/localStorage'
import { useMutation } from '@apollo/react-hooks'
import { SAVE_TRAVEL } from '../../utils/mutations'
import { GET_ME } from '../../utils/queries'
import Particle from '../Particle'
import { CgWebsite } from 'react-icons/cg'
import { MdFavorite } from 'react-icons/md'

function Travel () {
  // create state for holding returned google api data
  const [searchedTravels, setSearchedTravels] = useState([])

  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('')

  // create state to hold saved productId values
  const [savedTravelIds, setSavedTravelIds] = useState(getSavedTravelIds())

  // define the save product function from the mutation
  const [saveTravel] = useMutation(SAVE_TRAVEL)

  // set up useEffect hook to save `savedTravelIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveTravelIds(savedTravelIds)
  })

  // create method to search for products and set state on form submit
  const handleFormSubmit = async event => {
    event.preventDefault()

    if (!searchInput) {
      console.log("can't be empty")
      return false
    }

    try {
      const response = await searchTravel(searchInput)

      if (response.error) {
        throw new Error('something went wrong!')
      }
      setSearchedTravels(response)

      setSearchInput('')
    } catch (err) {
      console.error(err)
    }
  }
  // create function to handle saving a product to our database
  const handleSaveTravel = async productId => {
    // find the product in `searchedTravels` state by the matching id
    const productToSave = searchedTravels.find(
      product => product.productId === productId
    )

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null

    if (!token) {
      return false
    }

    try {
      await saveTravel({
        variables: { product: productToSave },
        update: cache => {
          const { me } = cache.readQuery({ query: GET_ME })
          // console.log(me)
          // console.log(me.savedTravels)
          cache.writeQuery({
            query: GET_ME,
            data: {
              me: { ...me, savedTravels: [...me.savedTravels, productToSave] }
            }
          })
        }
      })

      // if product successfully saves to user's account, save product id to state
      setSavedTravelIds([...savedTravelIds, productToSave.productId])
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <br></br>
      <Particle />
      <Container fluid className='search-content'>
        <h1 className='product-section'>
          Lets find <strong className='purple'>Travel </strong>
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
        <p style={{ color: 'white' }}></p>
        <h2 style={{ color: 'white' }}>
          {searchedTravels.length
            ? `Here are the ${searchedTravels.length} product results of your search.`
            : 'Search for a product to begin'}
        </h2>
        <Container
          id='search-results-container'
          className='row justify-content-lg-center'
        >
          {searchedTravels.map(product => {
            return (
              <Col
                id='search-results-cards'
                data-testid={`product-cardname-${product.title}`}
                className='col-11 col-md-6 col-lg-3 mx-0 md-5'
                key={product.productid}
              >
                <TravelCards
                  id={product.productid}
                  imgPath={product.product_img}
                  isBlog={false}
                  title={product.title}
                  price={product.sale_price}
                />
                {Auth.loggedIn() && (
                  <Col>
                    <Button
                      disabled={savedTravelIds?.some(
                        savedTravelId => savedTravelId === product.productId
                      )}
                      className='btn-block btn-info'
                      onClick={() => handleSaveTravel(product.productId)}
                    >
                       <MdFavorite /> &nbsp;
                      {savedTravelIds?.some(
                        savedTravelId => savedTravelId === product.productId
                      )
                        ? 'This product has been saved!'
                        : 'Save this Travel!'}
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
        </Container>
        <br></br>
        {/* <Button onClick={() => loadMore()}>Load More</Button> */}
      </Container>
    </>
  )
}

export default Travel;