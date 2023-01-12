import React, { useState, useEffect } from 'react'
import { Container, Col, Form, Button, Row } from 'react-bootstrap'
import Auth from '../../utils/auth'
import TravelCards from '../search/SearchCards'
import { searchTravel } from '../../utils/API'
import { saveTravelIds, getSavedTravelIds } from '../../utils/localStorage'
import { useMutation } from '@apollo/client'
import { SAVE_TRAVEL } from '../../utils/mutations'
import { GET_ME } from '../../utils/queries'
import Particle from '../Particle'
import { CgWebsite } from 'react-icons/cg'
import { MdFavorite } from 'react-icons/md'


function Travel () {
  // create state for holding our search field data
  const [searchDepartureToInput, setSearchDepartureToInput] = useState('')
  const [searchDepartureFromInput, setSearchDepartureFromInput] = useState('')
  const [searchDepartureDateInput, setsearchDepartureDateInput] = useState('')
  const [searchReturnDateInput, setsearchReturnDateInput] = useState('')

  // create state for holding returned google api data
  const [searchedTravels, setSearchedTravels] = useState([])
//create state to loading until fetching data is return
const [canSubmit, setcanNOTSubmit] = useState(true)
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
    if (!searchDepartureToInput) {
      console.log("can't be empty")
      return false
    }
    if (!searchDepartureFromInput) {
      console.log("can't be empty")
      return false
    }
    if (!searchDepartureDateInput) {
      console.log("can't be empty")
      return false
    }
    if (!searchReturnDateInput) {
      console.log("can't be empty")
      return false
    }

    try {
      setcanNOTSubmit(false);
      document.querySelector("#submit-button").disabled = true;
      const response = await searchTravel(searchDepartureToInput, searchDepartureDateInput, searchDepartureFromInput, 
      searchReturnDateInput)

      if (response.err) {
        throw new Error('something went wrong!')
      }else{
        document.querySelector("#submit-button").disabled = false;
      }
     setSearchedTravels(response)
     setcanNOTSubmit(true);
     setSearchDepartureToInput('');
     setSearchDepartureFromInput('');
     setsearchDepartureDateInput('');
     setsearchReturnDateInput('');
    
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
    console.log(travelToSave);
    const travelVars = {
      leavingFrom: travelToSave.airlineIMG,
      goingTo: travelToSave.pricingInfo.toString(),
      airWays: travelToSave.airlineName,
      duration: travelToSave.travelid,
      link: travelToSave.airlineURL
    }

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null

    if (!token) {
      return false
    }

    try {
      await saveTravel({variables: { travel: travelVars }})
      //   update: cache => {
      //     const { me } = cache.readQuery({ query: GET_ME })
      //     // console.log(me)
      //     // console.log(me.savedTravels)
      //     cache.writeQuery({
      //       query: GET_ME,
      //       data: {
      //         me: { ...me, savedTravels: [...me.savedTravels, travelToSave] }
      //       }
      //     })
      //   }
      // })

      // // if travel successfully saves to user's account, save travel id to state
      // setSavedTravelIds([...savedTravelIds, travelToSave.travelId])
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <br></br>
      <br></br>
      <Particle />
      <div>
      <h1 className='travel-section'style={{color:"white"}}>
          Let's find your<strong className='purple'>Destination </strong>
        </h1>
      <Container fluid className='search-content'style={{marginLeft: "9em", marginRight:"auto", display:"flex", justifyContent:"center"}}>
        
        <Form onSubmit={handleFormSubmit}>
          <Form.Row>
  
  
            <Col xs={12} md={8}>
              <Form.Control
                name='searchDepartureToInput'
                value={searchDepartureToInput}
                onChange={e => setSearchDepartureToInput(e.target.value)}
                type='text'
                placeholder='Departure to'
              />
            </Col>
            <Col xs={12} md={8}>
              <Form.Control
                name='searchDepartureFromInput'
                value={searchDepartureFromInput}
                onChange={e => setSearchDepartureFromInput(e.target.value)}
                type='text'
                placeholder='Departure from'
              />
            </Col>

            <Col xs={12} md={8}>
              <Form.Control
                name='searchDepartureDateInput'
                value={searchDepartureDateInput}
                onChange={e => setsearchDepartureDateInput(e.target.value)}
                type='text'
                placeholder='Departure Date (yyyy-mm-dd)'
              />
            </Col>
            <Col xs={12} md={8}>
              <Form.Control
                name='searchReturnDateInput'
                value={searchReturnDateInput}
                onChange={e => setsearchReturnDateInput(e.target.value)}
                type='text'
                placeholder='Return Date (yyyy-mm-dd)'
              />
            </Col>
            <Col xs={12} md={8}>
              <Button id="submit-button" type='submit' variant='success' size='lg'>
                {canSubmit?'Submit Search': 
                 `Rome wasn't built in a day`
                }
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Container>
      </div>

      <Container style={{ marginRight:"auto", display:"block", justifyContent:"center"}}>
        <p style={{ color: 'white'}}></p>
        <h2 style={{ color: 'white' }}>
          {searchedTravels.length
            ? `Here are the ${searchedTravels.length} travel results of your search.`
            : 'Search for travel to begin'}
        </h2>
        <Container 
          id='search-results-container'
          className='row justify-content-lg-center'
        >
          
          {searchedTravels.map(travel => {
            return (
              <Col
                id='search-results-cards'
                data-testid={`travel-cardname-${travel.airlineName}`}
                className='col-11 col-md-6 col-lg-3 mx-0 md-5'
                key={travel.travelid*3}
              >
                <TravelCards
                  id={travel.travelid}
                  imgPath={travel.airlineIMG}
                  isBlog={false}
                  title={travel.airlineName}
                  price={travel.pricingInfo}
                />
                {Auth.loggedIn() && (
                  <Col>
                    <Button
                      disabled={savedTravelIds?.some(
                        savedTravelId => savedTravelId === travel.travelId
                      )}
                      className='btn-block btn-info'
                      onClick={() => handleSaveTravel(travel.travelId)}
                    >
                       <MdFavorite /> &nbsp;
                      {savedTravelIds?.some(
                        savedTravelId => savedTravelId === travel.travelId
                      )
                        ? 'This travel has been saved!'
                        : 'Save this Travel!'}
                    </Button>

                    <Button
                      variant='primary'
                      href={travel.airlineURL}
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
        <br></br>
        {/* <Button onClick={() => loadMore()}>Load More</Button> */}
      </Container>
    </>
  )
}

export default Travel;