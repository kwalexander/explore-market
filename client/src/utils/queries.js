  
import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedProduct {
        productID
        title
        image
        forSale
        link
      }
      savedTravel {
        leavingFrom
        goingTo
        airWays
        duration
        link
      }
    }
  }
`;