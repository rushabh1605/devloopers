const { gql } = require("apollo-server");

const typeDefs = gql`
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
    matchDate: Date
    matchTime: String
    matchTimeZone: String
    homeTeamName: String
    homeTeamID: String
    homeTeamLogo: String
    awayTeamName: String
    awayTeamID: String
    awayTeamLogo: String
  }
 
  type LeagueTopScorer {
    playerID: Int!
    playerName: String
    playerImage: String
    teamName: String
    teamLogo: String
    goals: Int  
  }

  type LeagueTopAssists {
    playerID: Int!
    playerName: String
    playerImage: String
    teamName: String
    teamLogo: String
    assists: Int 
  }

  type PlayerByID {
    playerID: Int!
    playerName: String
    firstName: String
    lastName: String
    age: Int
    Nationality: String
    playerImage: String
    playerHeight: String
    playerWeight: String
    playerPosition: String
    playerRating: String
    teamName: String
    leagueName: String
    season: String
    appearances: Int
    lineUps: Int
    goals: Int
    assists: Int
    penaltyScored: Int
    penaltyMissed: Int  
    yellowCard: Int
    redCard: Int 
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

  type searchedPlayers {
    playerID: Int!
    playerName: String
    nationality: String
  }

  type Game {
    id: Int!
    fixtureID: Int
    userID: String
    awayTeam: Int
    homeTeam: Int
    betField: Int
    result: []
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
    GetPlayerByID(playerId: Int!, season: Int!) : PlayerByID 
    SearchPlayerByName(playerName: String!) : [searchedPlayers]
    GameInformation : Game

  }
   
  type Mutation{
    createGame(fixtureID, userID, awayTeam, homeTeam, betField ): Game
    updateGame(gameID, result ): Game
  }
`;

module.exports = typeDefs;
