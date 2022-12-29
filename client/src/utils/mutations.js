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

export const SAVE_Product = gql`
  mutation saveProduct($product: SavedProductInput!) {
    saveProduct(product: $product) {
      username
      email
      productCount
      savedProducts {
        productID
        title
        description
        productUPC
        image
        forSale
        link
      }
    }
  }
`;

export const REMOVE_product = gql`
  mutation removeProduct($productID: String!) {
    removeProduct(productID: $productID) {
      username
      email
      productCount
      savedProducts {
        productID
        title
        description
        productUPC
        image
        forSale
        link
      }
    }
  }
`;

export const SAVE_Travel = gql`
  mutation saveTravel($travel: SavedTravelInput!) {
    saveTravel(travel: $travel) {
      username
      email
      travelCount
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

export const REMOVE_travel = gql`
  mutation removeTravel($travelID: String!) {
    removeTravel(travelID: $travelID) {
      username
      email
      travelCount
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