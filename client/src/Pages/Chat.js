import { gql, useMutation, useQuery } from "@apollo/client";
import { useRef } from "react";

const GET_MESSAGES = gql`
  query GetMessages {
    getMessages {
      id
      content
      user
    }
  }
`;

const POST_MESSAGE = gql`
  mutation PostMessage($form: inputPostMessage) {
    postMessage(form: $form)
  }
`;

const Chat = () => {
  const refName = useRef(null);
  const refMessage = useRef(null);
  const { loading, error, data, refetch } = useQuery(GET_MESSAGES, {
    pollInterval: 500,
  });

  const [
    postMessage,
    { data: dataPost, loading: loadingPost, error: errorPost, reset },
  ] = useMutation(POST_MESSAGE);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const handleSendMessage = () => {
    postMessage({
      variables: {
        form: {
          user: refName.current.value,
          content: refMessage.current.value,
        },
      },
    });
    refetch();
  };
  return (
    <article>
      <section className="container-chat">
        <div>
          {data.getMessages.map((message) => (
            <div className="container-msg">
              <h1 style={{ fontSize: "12px" }}>{message.user}</h1>
              <p>{message.content}</p>
            </div>
          ))}
        </div>
        <div className="container-addchat">
          <input ref={refName} type="text" placeholder="user..." />
          <input ref={refMessage} type="text" placeholder="message..." />
          <button onClick={() => handleSendMessage()}>Send</button>
        </div>
      </section>
    </article>
  );
};

export default Chat;
