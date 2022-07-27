import { ApolloServer } from "apollo-server";
import typeDefs from "./src/schema/typeDefs";
import resolvers from "./src/schema/resolvers";

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url})=>{
    console.log(`your api is running at ${url}`)
})
