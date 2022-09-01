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
    postMessage: (parent, arg) => {
      console.log("parent: ", parent);
      console.log("arg: ", arg);
      const { user, content } = arg.form;
      const id = messages.length;
      messages.push({
        id,
        user,
        content,
      });
      return id;
    },
  },
};

module.exports = resolvers;
