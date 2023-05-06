const { gql } = require("apollo-server");

const typeDefs = gql`

  type User
  {
    _id: ID!
    username: String!
    password : String!
    dob: String
    phone: String
    email: String!
    country: String
    profilePic: String
    bio: String
    isPremium: Boolean
    coins: Int
    followingTeamID : [String]
    followingPlayerID: [String]
  }
  type League {
    id: Int!
    leagueName: String
    logo: String
    countryName: String
  }

  type SingleLeague {
    id: Int!
    leagueName: String
    logo: String
    countryName: String
  }

  type PlayersForFixture {
    id: Int!
    playerName: String
    jerseyNumber: Int
    position: String
  }

  type TeamsForFixture {
    id: Int!
    teamName: String
    logo: String
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

  type LeagueTopAssists {
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

  type TeamManager {
    managerID: Int!
    managerName: String
    firstName: String
    lastName: String
    age: Int
    Nationality: String
    managerImage: String
    teamName: String
    teamLogo: String
    startDate: String   
  }

  type FixtureLineUps {
    team1: TeamsForFixture
    team2: TeamsForFixture
    managerID: Int
    managerName: String
    managerImage: String
    formation: String
    startElevenTeam1: [PlayersForFixture]
    startElevenTeam2: [PlayersForFixture]
    substitutesTeam1: [PlayersForFixture]
    substitutesTeam2: [PlayersForFixture]
  }

   scalar Date



  type Query {
    LeagueInformation: [League]
    SingleLeagueInformation(id: Int!): SingleLeague
    TopLeaguesInformation: [League]
    StandingInformation(league: Int!, season: Int!): [TableStandings]
    FixtureByDateInformation(matchDate: Date!) : [FixtureByDate]
    TopScorerByLeague(league: Int!, season: Int!): [LeagueTopScorer]
    TopAssistsByLeague(league: Int!, season: Int!): [LeagueTopAssists]
    ManagerInformation(team: Int!) : TeamManager  
    GetUserById(id: ID!): User
    GetAllUsers: [User]
  }

  type Mutation
  {
    CreateUser(username:String!,password:String!, dob:String, phone:String!, email:String!, country:String!, profilePic:String, bio:String, isPremium:Boolean): User
    Login(username:String!,password:String!):Boolean
    DeleteUser(id: ID!): [User]
    AddTeamFollowing(userId:ID!,teamID: ID!) : User
    AddPlayerFollowing(userId:ID!,PlayerID: ID!) : User
    DeleteTeamFollowing(userId:ID!,teamID: ID!) : User
    DeletePlayerFollowing(userId:ID!,PlayerID: ID!) : User
  }



`;

module.exports = typeDefs;
