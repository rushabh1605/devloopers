const moment = require('moment');
const axios = require("axios");
const redis = require("redis");
const uuid = require("uuid");


const API_KEY = '3df39a1cbamsh63f95b9f20d493ep18c3d2jsnaa9a8f6d3181';
const API_HOST = 'api-football-v1.p.rapidapi.com';
const config = {
  headers:{
    'X-RapidAPI-Host' : API_HOST,
    'X-RapidAPI-Key' : API_KEY
  }
};

module.exports = { 
  Query: {
    LeagueInformation : async () => {
      //const desiredLeagues=['World', 'germany', 'england', 'france','spain', 'italy']
      let leagueList=[];           
      const { data } = await axios.get("https://api-football-v1.p.rapidapi.com/v3/leagues", config);

      data.response.forEach(league => {
        let singleLeague = {
          id : league.league.id,
          leagueName : league.league.name,
          logo :  league.league.logo,
          countryName : league.country.name
        } 
           
      leagueList.push(singleLeague);       
      });
      //console.log(leagueList.slice(0,7)); 
      // console.log(leagueList.slice(0,7)); 
      return leagueList;
    },

    SingleLeagueInformation : async (_, args) => {        
      const { data } = await axios.get("https://api-football-v1.p.rapidapi.com/v3/leagues?id=" + args.id, config);

      let finalData = data.response[0];

      let singleLeague = {
        id : finalData.league.id,
        leagueName : finalData.league.name,
        logo :  finalData.league.logo,
        countryName : finalData.country.name
      } 
      return singleLeague;
    },

    TopLeaguesInformation : async () => {

      const desiredLeagues=[39, 79, 61, 135, 140]; 
      const nationalLeagues = [1, 2, 3, 4, 9, 45, 46];
      const { data } = await axios.get("https://api-football-v1.p.rapidapi.com/v3/leagues", config);

      let leagueList=[]; 
      //const topLeagues = data.response.filter(league => desiredLeagues.includes(league.country.name));
      const topLeagues = data.response.filter(league => desiredLeagues.includes(league.league.id));

      //console.log(topLeagues);
      topLeagues.forEach(league => {
        let singleLeague = {
          id : league.league.id,
          leagueName : league.league.name,
          logo :  league.league.logo,
          countryName : league.country.name
        } 

        leagueList.push(singleLeague);
      })
        return leagueList;   
    },


    StandingInformation : async (_, args) => {
      let standingsList=[]; 
      const { data } = await axios.get
            ("https://api-football-v1.p.rapidapi.com/v3/standings?league="+ args.league +"&season="+args.season, config);

      let responseData= data.response[0];
      let temp = responseData.league.standings[0]

      temp.forEach(standing => {
        let singleTeam = {
          rank: standing.rank,
          teamName: standing.team.name,
          logo: standing.team.logo,
          points: standing.points,
          matchesPlayed: standing.all.played,
          matchesWon: standing.all.win,
          matchesLost: standing.all.lose,
          matchesDraw: standing.all.draw,
          homeMatches: standing.home.played,
          awayMatches: standing.away.played,
          goalsScored: standing.all.goals.for,
          goalsConceded: standing.all.goals.against
        }         
        standingsList.push(singleTeam);        
      });               
      return standingsList;
    },


    FixtureByDateInformation : async (_, args) => {
      let fixtureList=[]; 
      //console.log(typeof(args.matchDate));
      const parsedDate = moment.utc(args.matchDate);
      const formattedDate = parsedDate.format('YYYY-MM-DD');

      //console.log(formattedDate)
      const { data } = await axios.get
            ("https://api-football-v1.p.rapidapi.com/v3/fixtures?date="+ formattedDate, config);

      // console.log(data)

      data.response.forEach(fixture => {
        
        const matchTimeUTC = new Date(parseInt(fixture.fixture.timestamp) * 1000);
        //console.log(matchTimeUTC)
        const matchTimeEST = new Date(matchTimeUTC.toLocaleString("en-US", {timeZone: "America/New_York"}));
        let matchTimeESTString = matchTimeEST.toLocaleTimeString("en-US", {hour12: false});

        matchTimeESTString = matchTimeESTString.slice(0,5) + " ET";     

        let singleFixture = {
          id: fixture.fixture.id,
          venueName: fixture.fixture.venue.name,
          venueCity: fixture.fixture.venue.city,
          matchDate: formattedDate,
          matchTime: matchTimeESTString,
          matchTimeZone: fixture.fixture.timezone,
          matchStatus: fixture.fixture.status.long,
          league: fixture.league.name,
          country: fixture.league.country,
          leagueLogo: fixture.league.logo,
          season: fixture.league.season,
          homeTeamName: fixture.teams.home.name,
          homeTeamID: fixture.teams.home.id,
          homeTeamLogo: fixture.teams.home.logo,
          awayTeamName: fixture.teams.away.name,
          awayTeamID: fixture.teams.away.id,
          awayTeamLogo: fixture.teams.away.logo,
          homeTeamGoals: fixture.goals.home,
          awayTeamGoals: fixture.goals.away,
          homeHalfTimeScore: fixture.score.halftime.home,
          homeFullTimeScore: fixture.score.fulltime.home,
          awayHalfTimeScore: fixture.score.halftime.away,
          awayFullTimeScore: fixture.score.fulltime.away
          // homeHalfTimeScore: fixture.score.halftime.home + " - "+ fixture.score.halftime.away ,
          // homeFullTimeScore: fixture.score.fulltime.home + " - "+ fixture.score.fulltime.away ,
        }          
        fixtureList.push(singleFixture);       
      });

      //console.log(fixtureList.slice(0,2));            
      return fixtureList;
    },


    TopScorerByLeague : async (_, args) => {
      let topScorersList=[]; 
      const { data } = await axios.get
            ("https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league="+ args.league +"&season="+args.season, config);

      data.response.forEach(player => {
        let singlePlayer = {
          playerID: player.player.id,   
          playerName: player.player.name,
          playerImage: player.player.photo,
          teamName: player.statistics[0].team.name,
          teamLogo: player.statistics[0].team.logo,
          goals:  player.statistics[0].goals.total,
        }          
        topScorersList.push(singlePlayer);       
      });           
      return topScorersList;
    },

    GetPlayerByID : async (_, args) => {
      console.log(args.playerId); 
      const {data} = await axios.get("https://api-football-v1.p.rapidapi.com/v3/players?id="+ args.playerId+"&season="+ args.season, config);
      
      let singlePlayerData = data.response[0];
        let singlePlayer = {
          playerID: singlePlayerData.player.id,
          playerName: singlePlayerData.player.name,
          firstName: singlePlayerData.player.firstname,
          lastName: singlePlayerData.player.lastname,
          age: singlePlayerData.player.age,
          Nationality: singlePlayerData.player.nationality,
          playerImage: singlePlayerData.player.photo,
          playerHeight: singlePlayerData.player.height,
          playerWeight: singlePlayerData.player.weight,
          playerPosition: singlePlayerData.statistics[0].games.position,
          playerRating: singlePlayerData.statistics[0].games.rating,
          teamName: singlePlayerData.statistics[0].team.name,
          leagueName : singlePlayerData.statistics[0].league.name,
          season : singlePlayerData.statistics[0].league.season,
          appearances: singlePlayerData.statistics[0].games.appearences,
          lineUps: singlePlayerData.statistics[0].games.lineups,
          goals:  singlePlayerData.statistics[0].goals.total,
          assists: singlePlayerData.statistics[0].goals.assists,
          penaltyScored: singlePlayerData.statistics[0].penalty.scored,
          penaltyMissed: singlePlayerData.statistics[0].penalty.missed,
          yellowCard: singlePlayerData.statistics[0].cards.yellow,
          redCard: singlePlayerData.statistics[0].cards.red
        }                
      return singlePlayer;
    },

    TopAssistsByLeague : async (_, args) => {
      let topScorersList=[]; 
      const { data } = await axios.get
            ("https://api-football-v1.p.rapidapi.com/v3/players/topassists?league="+ args.league +"&season="+ args.season, config);

      data.response.forEach(player => {
        let singlePlayer = {
          playerID: player.player.id,   
          playerName: player.player.name,
          playerImage: player.player.photo,
          teamName: player.statistics[0].team.name,
          teamLogo: player.statistics[0].team.logo,
          assists:  player.statistics[0].goals.assists,
        }          
        topScorersList.push(singlePlayer);       
      });

      //console.log(topScorersList.slice(0,2));            
      return topScorersList;
    },

    SearchPlayerByName : async (_, args) => {
      let searchedPlayers=[]; 
      const { data } = await axios.get
            ("https://api-football-v1.p.rapidapi.com/v2/players/search/"+ args.playerName, config);

      let playersData= data.api.players;

      //console.log(data.api.players)

      playersData.forEach(player => {
        let singlePlayer = {
          playerID: player.player_id,   
          playerName: player.player_name,
          nationality: player.nationality
        }          
        searchedPlayers.push(singlePlayer);       
      });

      //console.log(topScorersList.slice(0,2));            
      return searchedPlayers;
    },


    ManagerInformation : async (_, args) => {
        const { data } = await axios.get
            ("https://api-football-v1.p.rapidapi.com/v3/coachs?team="+ args.team, config);
        
        let responseData= data.response[0];
        let singleManager={
          managerID: responseData.id,
          managerName: responseData.name,
          firstName: responseData.firstname,
          lastName: responseData.lastname,
          age: responseData.age,
          Nationality: responseData.nationality,
          managerImage: responseData.photo,
          teamName: responseData.career[0].team.name,
          teamLogo: responseData.career[0].team.logo,
          startDate: responseData.career[0].start
        }            
      return singleManager;
    },
}}
