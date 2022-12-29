  
import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      productCount
      savedProducts {
        productID
        title
        productUPC
        image
        forSale
        link
      }
      savedTravels {
        travelID
        leavingFrom
        goingTo
        airWays
        duration
        link
      }
    }
  }
`;