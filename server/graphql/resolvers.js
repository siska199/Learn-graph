const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const messages = [];

const resolvers = {
  Query: {
    books: () => books,
    getMessages: () => messages,
  },

  Mutation: {
    postMessage: (parent, arg, context) => {
      console.log("parent: ", parent);
      console.log("arg: ", arg);
      console.log("context: ", context);
      const { user, content } = arg.form;
      const { pubsub } = context;
      const id = messages.length;
      messages.push({
        id,
        user,
        content,
      });
      pubsub.publish("MESSAGES_UPDATED", {
        messagesUpdated: messages,
      });
      return id;
    },
  },

  Subscription: {
    messagesUpdated: {
      subscribe: (parent, args, context) => {
        console.log("parent: ", parent);
        console.log("args: ", args);
        console.log("context: ", context);
        const { pubsub } = context;
        return pubsub.asyncIterator("MESSAGES_UPDATED");
      },
    },
  },
};

module.exports = resolvers;
