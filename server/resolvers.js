const axios = require("axios");
const redis = require("redis");
// const REDIS_PORT = process.env.PORT || 6379;
// const client = redis.createClient();
const uuid = require("uuid");


const API_KEY = '3df39a1cbamsh63f95b9f20d493ep18c3d2jsnaa9a8f6d3181';
const API_HOST = 'api-football-v1.p.rapidapi.com';

// (async () => {
//   await client.connect();
// })();
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
  },
};
