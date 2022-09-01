import { gql, useQuery } from "@apollo/client";

const GET_MESSAGES = gql`
  query GetMessages {
    getMessages {
      id
      content
      user
    }
  }
`;

const Chat = () => {
  const { loading, error, data } = useQuery(GET_MESSAGES);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  return (
    <div>
      {data.getMessages.map((message) => (
        <div>
          <h1>{message.user}</h1>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Chat;
