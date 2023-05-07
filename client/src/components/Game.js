import React from 'react';
import { Link, useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import queries from '../queries';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery,useMutation} from "@apollo/client";
import NotFoundPage from "./NotFound"
import {Card} from 'react-bootstrap'
const moment = require('moment');
const Game = () => {

    let now = new Date();
    let dateString = moment(now).format('YYYY-MM-DD');
    let home;
    let away;
    let bet;
    let fixture;
    let userID ="644801104403065762287e6c";

   const {loading, error, data,refetch} = useQuery(
    queries.LOAD_FIXTURES,
    {
      fetchPolicy: 'cache-and-network',
      variables:{date:dateString},
      manual: true,
      refetchOnWindowFocus: false,
      enabled: false
      
    }
  );
  const {loading:ALLgameLoad, error:ALLgameError, data:ALLgameData} = useQuery(
    queries.LOAD_GAME_BY_USERID,
    {
      fetchPolicy: 'cache-and-network',
      variables:{id:userID},
      manual: true,
      refetchOnWindowFocus: false,
      enabled: false
      
    }
  );
  const [mutate,{loading: loadingmutation, error: errormutation, data: datamutation }] = useMutation(queries.CREATE_GAME);
  const handle_createGame = (event,home,away,bet,fixture) => {
    console.log(home,away,fixture,bet)
    mutate({
        
        variables:{
            fixtureID: fixture,
            userID: userID,
            awayTeam: parseInt(away),
            homeTeam:parseInt(home),
            betField: parseInt(bet),
            
        },
        refetchQueries:[{
            query : queries.LOAD_GAME_BY_USERID,
            variables:{
                id:userID
            }
        }]
      
       
  })
  
  }

if(loading || ALLgameLoad){
    return(
        <div class="spinner-border m-5" role="status">
  
        </div>
    )
} else if (error ) {
    console.log(ALLgameData)
    return(
        <NotFoundPage />
    )
}


if(data && ALLgameData){
    
    const {FixtureByDateInformation} = data
    // const {getGameByUserId} = ALLgameData
    let include_id = []
    if(ALLgameData === undefined){
        // console.log("heyyyyyy from 82")
        include_id = []
    }
    else{
        // console.log("from 87")
        // console.log(ALLgameData);
        {ALLgameData.getGameByUserId.map((x) => {
            //  const {getGameByUserId} = ALLgameData
            include_id.push(x.fixtureID)
        })}
    }
    console.log(include_id)
  
    return(
        <div className="row justify-content-center" id='home'>
            {FixtureByDateInformation.map((x) => {
                return(
            <div className='col-md-4'>
            <div className="wsk-cp-matches " >
                            <div className='row'>
                                <h5 className='tablehead'>DO you wanna BET ?</h5>
                            </div>
                            
                            <div class="row matches m-3">
                    <div class="col-md-3  d-flex align-items-center mt-4 mt-md-0">
                    <div>
                      <p className='teamname'>{x.homeTeamName}</p>
                    </div>
                    </div>
                    <div class="col-md-2">
                      <div>
                        <img alt="Home team" class="img-fluid teamimg" src={x.homeTeamLogo} />
                      </div>
                    </div>
                    <div class="col-md-2">
                    <div>
                      <p className='teamname'>{x.matchTime}</p>
                    </div>
                    </div>
                    <div class="col-md-2">
                      <div>
                        <img alt="Home team" class="img-fluid teamimg" src={x.awayTeamLogo} />
                      </div>
                    </div>
                    <div class="col-md-3  d-flex align-items-center mt-4 mt-md-0">
                      <div>
                        <p className='teamname align-text-left'>{x.awayTeamName}</p>
                      </div>
                    </div>
                  </div>

                  <div className='row mt-2'>
                        <h5 className='tablehead'>Predict Winner ?</h5>
                  </div>
                  {include_id.includes(x.id)?
                  <div></div>:
                  
                  <div className='row mt-4'>
                    <div className="d-flex">
                        <button className='btn btn-success' onClick={(event) => handle_createGame(event,home=x.homeTeamID,away=x.awayTeamID,bet=x.homeTeamID,fixture=x.id)}>{x.homeTeamName}</button>
                        <p className='teamname '>VS</p>
                        <button className='btn btn-success' onClick={(event) => handle_createGame(event,home=x.homeTeamID,away=x.awayTeamID,bet=x.awayTeamID,fixture=x.id)}>{x.awayTeamName}</button>
                    </div>
                    

                  </div>
                }
                                
            </div>
            </div>);
            })}
        </div>

    )
    
}

};

export default Game;


