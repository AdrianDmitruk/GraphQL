const { ApolloServer, gql } = require('apollo-server');

// Пример данных пользователей и постов
const users = [
    { id: '1', name: 'Пользователь 1' },
    { id: '2', name: 'Пользователь 2' },
    { id: '3', name: 'Пользователь 3' },
];

const posts = [
    { id: '101', title: 'Пост 1', userId: '1' },
    { id: '102', title: 'Пост 2', userId: '1' },
    { id: '103', title: 'Пост 3', userId: '2' },
    { id: '104', title: 'Пост 4', userId: '3' },
];

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    user: User!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    posts: [Post!]!
    post(id: ID!): Post
  }
`;

const resolvers = {
    Query: {
        users: () => users,
        user: (parent, { id }) => users.find(user => user.id === id),
        posts: () => posts,
        post: (parent, { id }) => posts.find(post => post.id === id),
    },
    User: {
        posts: (parent) => posts.filter(post => post.userId === parent.id),
    },
    Post: {
        user: (parent) => users.find(user => user.id === parent.userId),
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server OK`);
});
