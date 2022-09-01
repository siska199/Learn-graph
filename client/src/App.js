import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Chat from "./Pages/Chat";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache(),
  });
  
  return (
    <ApolloProvider client={client}>
      <Chat />
    </ApolloProvider>
  );
}

export default App;
