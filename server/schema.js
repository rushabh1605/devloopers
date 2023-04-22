const { gql } = require("apollo-server");

const typeDefs = gql`
  type League {
    id: Int!
    leagueName: String
    logo: String
    countryName: String
  }

  type TableStandings {
    rank: Int!
    teamName: String!
    logo: String!
    points: Int!
    matchesPlayed: Int!
    matchesWon: Int!
    matchesLost: Int!
    matchesDraw: Int!
    homeMatches: Int!
    awayMatches: Int!
    goalsScored: Int!
    goalsConceded: Int!
  }

  type Query {
    LeagueInformation: [League]
    standingInformation: [TableStandings]

  }
`;

module.exports = typeDefs;
