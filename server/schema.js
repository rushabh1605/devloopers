const { gql } = require("apollo-server");

const typeDefs = gql`
  type League {
    id: Int!
    leagueName: String
    logo: String
    countryName: String
  }

  type TableStandings {
    rank: Int
    teamName: String
    logo: String
    points: Int
    matchesPlayed: Int
    matchesWon: Int
    matchesLost: Int
    matchesDraw: Int
    homeMatches: Int
    awayMatches: Int
    goalsScored: Int
    goalsConceded: Int
  }

  type FixtureByDate {
    id: Int!
    venueName: String
    venueCity: String
    matchDate: Date
    matchTime: String
    matchTimeZone: String
    matchStatus: String
    league: String
    country: String
    leagueLogo: String
    season: Int
    homeTeamName: String
    homeTeamID: String
    homeTeamLogo: String
    awayTeamName: String
    awayTeamID: String
    awayTeamLogo: String
    homeTeamGoals: Int
    awayTeamGoals: Int
    homeHalfTimeScore: Int
    homeFullTimeScore: Int
    awayHalfTimeScore: Int
    awayFullTimeScore: Int
  }

  type LeagueTopScorer {
    playerID: Int!
    firstName: String
    lastName: String
    age: Int
    Nationality: String
    playerImage: String
    playerHeight: String
    playerWeight: String
    playerPosition: String
    isInjured: Boolean
    teamName: String
    teamLogo: String
    appearances: Int
    lineUps: Int
    season: Int
    goals: Int
    assists: Int
    penaltyScored: Int
    penaltyMissed: Int
    
  }

  scalar Date

  type Query {
    LeagueInformation: [League]
    StandingInformation(league: Int!, season: Int!): [TableStandings]
    FixtureByDateInformation(matchDate: Date!) : [FixtureByDate]
    TopScorerByLeague(league: Int!, season: Int!): [LeagueTopScorer]
  }
`;

module.exports = typeDefs;
