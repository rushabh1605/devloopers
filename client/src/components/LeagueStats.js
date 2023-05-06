import React from "react";
import { Link, useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import queries from '../queries';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from "@apollo/client";
import NotFoundPage from "./NotFound"
import {Card} from 'react-bootstrap'

const LeagueStats = () => {

   let { leagueId } = useParams();

   leagueId = parseInt(leagueId)
   console.log(leagueId)

   const {loading: LeagueLoading, error: LeagueError, data: LeagueData } = useQuery(
      queries.LOAD_LEAGUE_BY_ID, {
              fetchPolicy: 'cache-and-network',
              variables:{id: leagueId},
              manual: true,
              refetchOnWindowFocus: false,
              enabled: false
          }
  )

   const { loading, error, data, refetch } = useQuery(
      queries.LOAD_TOP_SCORER, {
          fetchPolicy: 'cache-and-network',
          variables:{league: leagueId, season: 2022},
          manual: true,
          refetchOnWindowFocus: false,
          enabled: false
      }
  )

  console.log(data)

  if(loading || LeagueLoading){
   return(
       <div class="spinner-border m-5" role="status">
 
       </div>
      )
   } else if (error || LeagueError) {
      return(
         <NotFoundPage />
      )
   }

   if(LeagueData & data){
      return(
          <div class="row justify-content-center" id='home' >
              <div class="col-md-10">
              <div className="wsk-cp-matches" >
              </div>
              <Link to={`\standings`}>
                      <button> Top Scorers </button>
                  </Link>
                  <Link to={`\stats`}>
                      <button> Top Assets </button>
              </Link>

              <div class="col-md-3  d-flex align-items-center mt-3 mt-md-0">
                  <div>
                      <p className='teamname'>{LeagueData.SingleLeagueInformation.leagueName}</p>
                  </div>
              </div>

              <div class="col-md-1">
                  <div>
                      <img alt="Home team"  src={LeagueData.SingleLeagueInformation.logo} />
                  </div>
              </div>
              <br/><br/><br/><br/>

              <div class="col-md-3  d-flex align-items-center mt-3 mt-md-0">
                  <div>
                      <p className='teamname'>{LeagueData.SingleLeagueInformation.countryName}</p>
                  </div>
              </div>
              </div>
          </div>

          // Nav Bar



          

          
          
      )
  }
//Displaying data of top Scorers.

  if(data){
   return(
       <div class="row justify-content-center" id='home' >
           <div class="col-md-10">
               <div className="wsk-cp-matches" >
                   <p className='teamname'>
                     Players
                   </p>

                   {data.TopScorerByLeague.map((x) => {
                       // Logo, matches playes, matches won, matches draw, matches lost, points, home matchs, away matches, goals scored, goals conceded
                       return (
                        <Card key={x.playerID} style={{ width: '18rem' }}>
                           <Link to={`/player/${x.playerID}`}>
                              <Card.Img variant="top" src={x.playerImage} />
                           </Link>
                           
                           <Card.Body>
                           <Card.Title>{x.firstName} {x.lastName}</Card.Title>
                           <Card.Text>
                              Age: {x.age}
                              <br />
                              Position: {x.playerPosition}
                           </Card.Text>
                           </Card.Body>
                        </Card>
                       )
                   })}
               </div>
           </div>
       </div>
   )
}




}

export default LeagueStats