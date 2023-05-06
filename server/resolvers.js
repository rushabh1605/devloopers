const moment = require('moment');
const axios = require("axios");
const redis = require("redis");
const uuid = require("uuid");

const data = require("./data");
const { deleteUser } = require("./data/users");
const user = data.users;


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

      const desiredLeagues=[1, 2, 3, 4, 79, 45, 46, 9, 61, 135, 39, 140, ];    
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
        

        // console.log("Match time in EST: ", matchTimeESTString.slice(0,5) + " ET");
        matchTimeESTString = matchTimeESTString.slice(0,5) + " ET";

        // if(matchTimeESTString.indexOf(":")=== 2){
        //   matchTimeESTString=matchTimeESTString.slice(0,5) + matchTimeESTString.slice(8,11) + " ET";
        // }
        // else
        // {matchTimeESTString=matchTimeESTString.slice(0,4) +matchTimeESTString.slice(7,10) + " ET";}
        

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

      //console.log(data)

      data.response.forEach(player => {
        let singlePlayer = {
          playerID: player.player.id,   
          firstName: player.player.firstname,
          lastName: player.player.lastname,
          age: player.player.age,
          Nationality: player.player.nationality,
          playerImage: player.player.photo,
          playerHeight: player.player.height,
          playerWeight: player.player.weight,
          playerPosition: player.statistics[0].games.position,
          isInjured: player.player.injured,
          teamName: player.statistics[0].team.name,
          teamLogo: player.statistics[0].team.logo,
          appearances: player.statistics[0].games.appearences,
          lineUps: player.statistics[0].games.lineups,
          season: player.statistics[0].league.season,
          goals:  player.statistics[0].goals.total,
          assists: player.statistics[0].goals.assists,
          penaltyScored: player.statistics[0].penalty.scored,
          penaltyMissed: player.statistics[0].penalty.missed
        }          
        topScorersList.push(singlePlayer);       
      });

      //console.log(topScorersList.slice(0,2));            
      return topScorersList;
    },

    TopAssistsByLeague : async (_, args) => {
      let topScorersList=[]; 
      const { data } = await axios.get
            ("https://api-football-v1.p.rapidapi.com/v3/players/topassists?league="+ args.league +"&season="+ args.season, config);

      //console.log(data)

      data.response.forEach(player => {
        let singlePlayer = {
          playerID: player.player.id,   
          firstName: player.player.firstname,
          lastName: player.player.lastname,
          age: player.player.age,
          Nationality: player.player.nationality,
          playerImage: player.player.photo,
          playerHeight: player.player.height,
          playerWeight: player.player.weight,
          playerPosition: player.statistics[0].games.position,
          isInjured: player.player.injured,
          teamName: player.statistics[0].team.name,
          teamLogo: player.statistics[0].team.logo,
          appearances: player.statistics[0].games.appearences,
          lineUps: player.statistics[0].games.lineups,
          season: player.statistics[0].league.season,
          goals:  player.statistics[0].goals.total,
          assists: player.statistics[0].goals.assists,
          penaltyScored: player.statistics[0].penalty.scored,
          penaltyMissed: player.statistics[0].penalty.missed
        }          
        topScorersList.push(singlePlayer);       
      });

      //console.log(topScorersList.slice(0,2));            
      return topScorersList;
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

    GetAllUsers: async () => {     
      const user_list = await user.getAllUsers();
      if(user_list.errors){
          return user_list.errors[0].message
      }
      else{
          return (user_list);
      }
    },

    GetUserById: async (_, args) => {
      const oneUser = await user.getUserById(args.id);
      if(oneUser.errors){
      
          return oneUser.errors[0].message
      }
      else{
          return (oneUser);
      }
      
    }

  },

  Mutation:{
    CreateUser: async (_, args) => {
            const oneUser = await user.createUser(
                args.username,
                args.password,
                args.dob,
                args.phone, 
                args.email, 
                args.country, 
                args.profilePic, 
                args.bio, 
                args.isPremium );
            if(oneUser.errors){
                    return oneUser.errors[0].message
            }
            else{
                return (oneUser);
            }
    },

    DeleteUser: async(_,args)=>{
        const deleteone = await user.deleteUser(args.id);
            if(deleteone.errors){
            
                return deleteone.errors[0].message
            }
            else{
                return (deleteone);
            }
    },

    Login: async(_,args)=>{
        const loggedIn = await user.checkUser(args.username,args.password);
            if(loggedIn.errors){
            
                return loggedIn.errors[0].message
            }
            else{
                return (loggedIn);
            }
    },

    AddTeamFollowing: async(_,args)=>{
        const addTeam = await user.addTeamFollowing(args.userId,args.teamID);
            if(addTeam.errors){
            
                return addTeam.errors[0].message
            }
            else{
                return (addTeam);
            }
    },

    AddPlayerFollowing: async(_,args)=>{
        const addPlayer = await user.addPlayerFollowing(args.userId,args.PlayerID);
            if(addPlayer.errors){
            
                return addPlayer.errors[0].message
            }
            else{
                return (addPlayer);
            }
    },
    
    DeleteTeamFollowing: async(_,args)=>{
        const deleteTeam = await user.deleteTeamFollowing(args.userId,args.teamID);
            if(deleteTeam.errors){
            
                return deleteTeam.errors[0].message
            }
            else{
                return (deleteTeam);
            }
    },
    
    DeletePlayerFollowing: async(_,args)=>{
        const deletePlayer = await user.deletePlayerFollowing(args.userId,args.PlayerID);
            if(deletePlayer.errors){
            
                return deletePlayer.errors[0].message
            }
            else{
                return (deletePlayer);
            }
    },
  },

}
