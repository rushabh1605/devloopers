import React from 'react';
import { Link, useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import queries from '../queries';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from "@apollo/client";
import NotFoundPage from "./NotFound"
import {Card} from 'react-bootstrap'

const SinglePlayer = () => {

    let { playerId } = useParams();

   playerId = parseInt(playerId)

   const { loading, error, data, refetch } = useQuery(
    queries.LOAD_PLAYER_BY_ID_INFO, {
        fetchPolicy: 'cache-and-network',
        variables:{playerId: playerId},
        manual: true,
        refetchOnWindowFocus: false,
        enabled: false
    }
)



if(loading){
    return(
        <div class="spinner-border m-5" role="status">
  
        </div>
    )
} else if (error) {
    return(
        <NotFoundPage />
    )
}

if(data){
    const {GetPlayerByID} = data
    return(
        
        <div class="row justify-content-center" id='home'  >
                <div className='col-md-11'>
                    <div className="wsk-cp-matches mt-3" >
                                                            <div className="col-md-10 d-flex">
                                                                <img alt="playerlogo" class=" img-fluid leagueimg" src={GetPlayerByID.playerImage} />
                                                                <div className="d-block">
                                                               
                                                                    <p className="ml-2 tablehead">{GetPlayerByID.playerName}</p>
                                                               

                                                                <div className="d-flex">
                                                                    
                                                                    <img alt="Leaguelogo" class=" ml-2" width="20" height="20" src={GetPlayerByID.teamLogo} /> 
                                                                    <p className="ml-2 tablehead">{GetPlayerByID.teamName}</p>
                                                                </div>
                                                                
                                                            </div>
                                                            </div>
                                
                    </div>
                </div>

                <div className='col-md-11'>
                    <div className='col-md-4 mr-auto p-0'>
                        <div className="wsk-cp-matches " >
                            <div className='row'>
                                <div className='col-md-4'>
                                    <p className="tablehead">Height</p>
                                </div>
                                <div className='col-md-4'>
                                    <p className="tablehead">Weight</p>
                                </div>
                                <div className='col-md-4'>
                                    <p className="tablehead">Age</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <p className="tablehead">{GetPlayerByID.playerHeight}</p>
                                </div>
                                <div className='col-md-4'>
                                    <p className="tablehead">{GetPlayerByID.playerWeight}</p>
                                </div>
                                <div className='col-md-4'>
                                    <p className="tablehead">{GetPlayerByID.age}</p>
                                </div>
                            </div>
                            <hr
                                                                style={{
                                                                background: "#D3D3D3",
                                                                height: "2px",
                                                                border: "none",
                                                                opacity:0.1
                                                                }}
                            />
                            <div className='row'>
                                <div className='col-md-4'>
                                    <p className="tablehead">Height</p>
                                </div>
                                <div className='col-md-4'>
                                    <p className="tablehead">Weight</p>
                                </div>
                                <div className='col-md-4'>
                                    <p className="tablehead">Age</p>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <p className="tablehead">{GetPlayerByID.playerHeight}</p>
                                </div>
                                <div className='col-md-4'>
                                    <p className="tablehead">{GetPlayerByID.playerWeight}</p>
                                </div>
                                <div className='col-md-4'>
                                    <p className="tablehead">{GetPlayerByID.age}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                
        </div>
            
      
    )
}

};

export default SinglePlayer;

// Nationality: "Norway"
// age: 23
// appearances: 31
// assists: 7
// firstName: "Erling"
// goals: 35
// isInjured: false
// lastName: "Braut Haaland"
// lineUps: 30
// penaltyMissed: 0
// penaltyScored: 7
// playerHeight:"194 cm"
// playerID: 1100
// playerImage: "https://media-3.api-sports.io/football/players/1100.png"
// playerPosition: "Attacker"
// playerWeight: "88 kg"
// season: 2022
// teamLogo:"https://media-2.api-sports.io/football/teams/50.png"
// teamName: "Manchester City"
