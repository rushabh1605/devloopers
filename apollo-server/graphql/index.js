const { ApolloServer, gql } = require('apollo-server-azure-functions');

const {
  ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// Create our server.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});
exports.graphqlHandler = server.createHandler();