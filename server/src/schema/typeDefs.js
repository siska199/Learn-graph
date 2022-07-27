import {gql} from "apollo-server"

const typeDefs = gql`
    type User {
        id : ID!
        name : String!
        username : String!
        age : Int!
        nationality : Nationality!
        friends : [User]
        favoriteMovies : [Movie]
    }
    type Movie{
        id : ID!
        name : String!
        year : Int!
        isInTheathers : Boolean!
    }

    type Query{
        users : [User!]! 
        user(id: ID!): User!  
        movies : [Movie!]!
        movie(name: String!): Movie!
    }

    input CreateUserInput{
        name : String!
        age : Int!
        nationality : Nationality!
    }

    input UpdateUserInput{
        id : ID!
        name : String
        username : String
        age : Int
        nationality : Nationality
    }

    type Mutation {
        createUser(input: CreateUserInput!) : User
        updateUser(input: UpdateUserInput!) : User
        deleteUser(id : ID!): [User]
    }

    enum Nationality {
        CANADA
        BRAZIL
        INDIA
        GERMANY
        CHILE
    }
    
`

export default typeDefs