  
import gql from "graphql-tag";

export const GET_ME = gql`
  query {
    me {
      _id
      username
      email
      savedProduct {
        _id
        productID
        title
        image
        forSale
        link
      }
      savedTravel {
        _id
        leavingFrom
        goingTo
        airWays
        duration
        link
      }
    }
  }
`;