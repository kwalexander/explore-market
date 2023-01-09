  
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