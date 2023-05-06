import React from "react";
import { Link, useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import queries from '../queries';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from "@apollo/client";
import NotFoundPage from "./NotFound"

const Standings = () => {
    let { leagueId } = useParams();
    leagueId = parseInt(leagueId)
    console.log(leagueId)

    const { loading, error, data, refetch } = useQuery(
        queries.LOAD_STANDINGS, {
            fetchPolicy: 'cache-and-network',
            variables:{league: leagueId, season: 2022},
            manual: true,
            refetchOnWindowFocus: false,
            enabled: false
        }
    )
    console.log(error)

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

    console.log(data.StandingInformation)

    if(data){
        return(
            <div class="row justify-content-center" id='home' >
                <div class="col-md-10">
                    <div className="wsk-cp-matches" >
                        <p className='teamname'>
                        Logo, matches playes, matches won, matches draw, matches lost, points, home matchs, away matches, goals scored, goals conceded
                        </p>
                        {data.StandingInformation.map((x) => {
                            // Logo, matches playes, matches won, matches draw, matches lost, points, home matchs, away matches, goals scored, goals conceded
                            return (
                                <div class="row matches m-10">
                                    <div class="col-md-3  d-flex align-items-center mt-3 mt-md-0">
                                        <div>
                                            <p className='teamname'>{x.rank}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-1">
                                        <div>
                                            <img alt="Home team" class="img-fluid teamimg" src={x.logo} />
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div>
                                            <p className='teamname'>{x.teamName}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div>
                                            <p className='teamname'>{x.matchesPlayed}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div>
                                            <p className='teamname'>{x.matchesWon}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div>
                                            <p className='teamname'>{x.matchesDraw}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div>
                                            <p className='teamname'>{x.matchesLost}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div>
                                            <p className='teamname'>{x.points}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div>
                                            <p className='teamname'>{x.homeMatches}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div>
                                            <p className='teamname'>{x.awayMatches}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div>
                                            <p className='teamname'>{x.goalsScored}</p>
                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div>
                                            <p className='teamname'>{x.goalsConceded}</p>
                                        </div>
                                    </div>
                                </div>
                                            
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

}

export default Standings