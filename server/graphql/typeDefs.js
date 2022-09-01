const { gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Message {
    id : ID!
    user :String!
    content: String ! 
  }


  type Query {
    books: [Book]
    messages : [Message!]
  }

  input inputPostMessage{
    user : String!
    content : String!
  }
  type Mutation {
    postMessage(form:inputPostMessage): ID!
  }
`;

module.exports = typeDefs;
