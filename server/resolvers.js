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
      //const desiredLeagues=['world', 'germany', 'england', 'france','spain', 'italy']
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
      console.log(leagueList.slice(0,7)); 
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
}}
