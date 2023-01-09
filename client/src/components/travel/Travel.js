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

function Travel () {
  // create state for holding returned google api data
  const [searchedTravels, setSearchedTravels] = useState([])
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('')

  // create state to hold saved travelId values
  const [savedTravelIds, setSavedTravelIds] = useState(getSavedTravelIds())

  // define the save travel function from the mutation
  const [saveTravel] = useMutation(SAVE_TRAVEL)

  // set up useEffect hook to save `savedTravelIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveTravelIds(savedTravelIds)
  })

  // create method to search for travels and set state on form submit
  const handleFormSubmit = async event => {
    event.preventDefault()

    if (!searchInput) {
      return false
    }

    try {
      const response = await searchTravel(searchInput)

      if (!response.ok) {
        throw new Error('something went wrong!')
      }

      const { items } = await response.json()

      const travelData = items.map(travel => ({
        travelId: travel.id,
        title: travel.title,
        price: travel.price,
        image: travel.img || ''
      }))

      setSearchedTravels(travelData)
      setSearchInput('')
    } catch (err) {
      console.error(err)
    }
  }

  // create function to handle saving a travel to our database
  const handleSaveTravel = async travelId => {
    // find the travel in `searchedTravels` state by the matching id
    const travelToSave = searchedTravels.find(
      travel => travel.travelId === travelId
    )

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null

    if (!token) {
      return false
    }

    try {
      await saveTravel({
        variables: { travel: travelToSave },
        update: cache => {
          const { me } = cache.readQuery({ query: GET_ME })
          // console.log(me)
          // console.log(me.savedTravels)
          cache.writeQuery({
            query: GET_ME,
            data: {
              me: { ...me, savedTravels: [...me.savedTravels, travelToSave] }
            }
          })
        }
      })

      // if travel successfully saves to user's account, save travel id to state
      setSavedTravelIds([...savedTravelIds, travelToSave.travelId])
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <br></br>
      <Container fluid className='travel-section'>
        <Particle />
        <Container fluid className='search-content'>
        <h1 className='travel-section'>
          Lets find <strong className='purple'>Travel </strong>
        </h1>
     
        <Form onSubmit={handleFormSubmit}>
          <Form.Group xs={12} md={8}>
            <Form.Control
              name='searchInput'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              type='text'
              placeholder='Search for a travel by name'
            
            />
          </Form.Group>
          <br></br>
          <Button type='submit' variant='success' size='lg'>
            Submit Search
          </Button>
        </Form>
        </Container>
      </Container>
  
      <Container >
        {/* <p style={{ color: 'white' }}>
          Here are Travel results of your search .
        </p> */}
        <h2 
         style={{ color: 'white' }}
         >
          {searchedTravels.length
            ? `Viewing ${searchedTravels.length} results:`
            : 'Search for a travel to begin'}
        </h2>
        <Container className='search-content' >
        {searchedTravels.map(travel => {
          return (
            <Row
              key={travel.travelId}
              data-test-id='travel-cards-row'
              style={{ justifyContent: 'center', paddingBottom: '10px' }}
            >
              <Col md={4} className='travel-cards'>
                <TravelCards
                  id={travel.travelId}
                  imgPath={travel.travel['main_image']}
                  isBlog={false}
                  title={travel.travel['title']}
                  price={travel.offers.primary['symbol'] && travel.offers.primary['price']}
                  siteLink={travel.travel['link']}
                />
                {Auth.loggedIn() && (
                  <Button
                    disabled={savedTravelIds?.some(
                      savedTravelId => savedTravelId === travel.travelId
                    )}
                    className='btn-block btn-info'
                    onClick={() => handleSaveTravel(travel.travelId)}
                  >
                    {savedTravelIds?.some(
                      savedTravelId => savedTravelId === travel.travelId
                    )
                      ? 'This travel has been saved!'
                      : 'Save this Travel!'}
                  </Button>
                )}
              </Col>
            </Row>
          )
        })}
        </Container>
      </Container>
    </>
  )
}

export default Travel
