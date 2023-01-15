import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_PRODUCT = gql`
  mutation saveProduct($product: SavedProductInput!) {
    saveProduct(newProduct: $product) {
      username
      email
      savedProduct {
        productID
        title
        description
        image
        forSale
        link
      }
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation removeProduct($productID: String!) {
    removeProduct(productID: $productID) {
      username
      email
      savedProduct {
        productID
        title
        description
        image
        forSale
        link
      }
    }
  }
`;

export const SAVE_TRAVEL = gql`
  mutation saveTravel($travel: SavedTravelInput!) {
    saveTravel(travel: $travel) {
      username
      email
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

export const REMOVE_TRAVEL = gql`
  mutation removeTravel($travelID: String!) {
    removeTravel(travelID: $travelID) {
      username
      email
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