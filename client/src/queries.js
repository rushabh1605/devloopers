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

const SEARCH_PLAYER_BY_NAME = gql`   
    query SearchPlayerByName( $playerName: String!) {
        SearchPlayerByName(playerName: $playerName) {
            playerID,
            playerName
            nationality
        
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
            matchDate,
            matchTime,
            matchTimeZone,
            homeTeamName,
            homeTeamID,
            homeTeamLogo,
            awayTeamName,
            awayTeamID,
            awayTeamLogo,

        }
    }
`;

const LOAD_TOP_SCORER = gql`
    query TopScorerByLeague($league: Int!, $season: Int!){
        TopScorerByLeague(league: $league, season: $season) {
            playerID,
            playerName
            playerImage,
            teamName,
            teamLogo,
            goals
        }
    }
`;

const LOAD_TOP_ASSISTS = gql`
    query TopAssistsByLeague( $league: Int!, $season: Int!) {
        TopAssistsByLeague(league: $league, season: $season) {
            playerID
            playerName
            playerImage
            teamName
            teamLogo
            assists

        }
    }
`;


const LOAD_PLAYER_BY_ID_INFO = gql`
        query GetPlayerByID($playerId: Int!) {
            GetPlayerByID(playerId: $playerId,season:2022) {
                playerID
                playerName
                firstName
                lastName
                playerImage
                age
                Nationality
                playerHeight
                playerWeight
                playerPosition
                playerRating
                teamName
                leagueName
                season
                appearances
                lineUps
                goals
                assists
                penaltyScored
                penaltyMissed
                yellowCard
                redCard

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

export default {
    LOAD_LEAGUES,
    LOAD_STANDINGS,
    LOAD_FIXTURES,
    LOAD_TOP_SCORER,
    LOAD_TOP_ASSISTS,
    LOAD_TOP_LEAGUES,
    LOAD_LEAGUE_BY_ID,
    LOAD_MANAGER_INFO,
    LOAD_PLAYER_BY_ID_INFO,
    SEARCH_PLAYER_BY_NAME
};