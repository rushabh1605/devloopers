import { gql } from '@apollo/client';

const LOAD_LEAGUES = gql`   
    query LeagueInformation {
        LeagueInformation {
            id
            leagueName
            logo
            countryName
        }
    }
`;

const LOAD_LEAGUE_BY_ID = gql`   
    query SingleLeagueInformation($id: Int!) {
        SingleLeagueInformation(id: $id) {
            id
            leagueName
            logo
            countryName
        }
}
`;

const LOAD_STANDINGS = gql`
    query StandingInformation($league: Int!, $season: Int!){
        StandingInformation(league: $league, season: $season) {
            rank,
            teamName,
            logo,
            points,
            matchesPlayed,
            matchesWon,
            matchesLost,
            matchesDraw,
            homeMatches,
            awayMatches,
            goalsScored,
            goalsConceded
        }
    }
`;

const LOAD_FIXTURES = gql`
    query FixtureByDateInformation($date: Date!){
        FixtureByDateInformation(matchDate: $date) {
            id,
            venueName,
            matchDate,
            matchTime,
            matchTimeZone,
            matchStatus,
            league,
            country,
            leagueLogo,
            season,
            homeTeamName,
            homeTeamID,
            homeTeamLogo,
            awayTeamName,
            awayTeamID,
            awayTeamLogo,
            homeTeamGoals,
            awayTeamGoals,
            homeHalfTimeScore,
            homeFullTimeScore,
            awayHalfTimeScore,
            awayFullTimeScore 
        }
    }
`;

const LOAD_TOP_SCORER = gql`
    query TopScorerByLeague($league: Int!, $season: Int!){
        TopScorerByLeague(league: $league, season: $season) {
            playerID,
            firstName,
            lastName,
            age,
            Nationality,
            playerImage,
            playerHeight,
            playerWeight,
            playerPosition,
            isInjured,
            teamName,
            teamLogo,
            appearances,
            lineUps,
            season,
            goals,
            assists,
            penaltyScored,
            penaltyMissed 
        }
    }
`;

const LOAD_TOP_ASSISTS = gql`
    query TopScorerByLeague($league: Int!, $season: Int!){
        TopScorerByLeague(league: $league, season: $season) {
            playerID,
            firstName,
            lastName,
            age,
            Nationality,
            playerImage,
            playerHeight,
            playerWeight,
            playerPosition,
            isInjured,
            teamName,
            teamLogo,
            appearances,
            lineUps,
            season,
            goals,
            assists,
            penaltyScored,
            penaltyMissed 
        }
    }
`;

const LOAD_MANAGER_INFO = gql`
    query ManagerInformation($team: Int!){
        ManagerInformation(team: $team) {
            managerID,
            managerName,
            firstName,
            lastName,
            age,
            Nationality,
            managerImage,
            teamName,
            teamLogo,
            startDate,
        
        }
    }
`;

const LOAD_TOP_LEAGUES = gql`
    query TopLeaguesInformation {
        TopLeaguesInformation {
            id,
            leagueName,
            logo,
            countryName
        }
    }
`;

const CREATE_USER = gql`
    mutation CreateUser (
        $username: String!,
        $password: String!,
        $dob: String,
        $phone: String,
        $email: String!, 
        $country: String,
        $profilePic: String,
        $bio: String,
        $isPremium: Boolean
    ) {
        CreateUser (
            username: $username,
            password: $password,
            dob: $dob,
            phone: $phone,
            email: $email, 
            country: $country,
            profilePic: $profilePic,
            bio: $bio,
            isPremium: $isPremium   
        ) {
            username
            password
            dob
            phone
            email
            country
            profilePic
            bio
            isPremium
        }
    }
`;

const GET_ALL_USER = gql `
    query GetAllUsers{
        GetAllUsers{
            _id
            username
            email
        }
    }
`

const GET_USER_BY_ID = gql `
    query GetUserById ($id: ID!){
        GetUserById(id: $id){
            _id
            username
            email
        }
    }
`

export default {
    LOAD_LEAGUES,
    LOAD_STANDINGS,
    LOAD_FIXTURES,
    LOAD_TOP_SCORER,
    LOAD_TOP_ASSISTS,
    LOAD_TOP_LEAGUES,
    LOAD_LEAGUE_BY_ID,
    LOAD_MANAGER_INFO,
    CREATE_USER,
    GET_ALL_USER,
    GET_USER_BY_ID


};