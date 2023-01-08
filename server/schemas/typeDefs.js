const { gql } = require('apollo-server-express');

// typeDefs
//PRODUCT MIght not need description
const typeDefs = gql`
    type Product {
        _id: ID
        title: String
        description: String
        productID: String
        image: String
        forSale: String
        link: String
   
    }
    type Travel {
        _id: ID
        leavingFrom: String
        goingTo: String
        airWays: String
        duration: String
        link: String
    }
    type User {
        _id: ID
        username: String
        email: String
        savedProduct: [Product] 
        savedTravel: [Travel]        
    }
    type Query {
        me: User
    }
    type Auth {
    token: ID!
    user: User
    }
    input SavedProductInput {
        title: String
        description: String
        productID: String
        image: String
        forSale: String
        link: String
        
    }
    input SavedTravelInput {
        leavingFrom: String
        goingTo: String
        airWays: String
        duration: String
        link: String
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveProduct(newProduct: SavedProductInput!): User
        removeProduct(productID: String!): User
        saveTravel(travel: SavedTravelInput!): User
        removeTravel(_id: String!): User
}
`;

// export the typeDefs
module.exports = typeDefs;