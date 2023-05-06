import React from 'react';
import queries from '../queries';
import '../App.css';
import  {useState,useEffect} from 'react';
import {useQuery,useMutation} from '@apollo/client';
import { Link, useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
const moment = require('moment');

function Landing() {
  // console.log(id)
  let now = new Date();
  let dateString = moment(now).format('YYYY-MM-DD');
  // console.log(dateString)
  const [getDate, setDate] = useState('');
  // console.log(getDate)
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
   
    const {loading:LeagueLoading, error:LeagueError, data:LeagueData} = useQuery(
      queries.LOAD_TOP_LEAGUES,
      {
        fetchPolicy: 'cache-and-network',
        manual: true,
        refetchOnWindowFocus: false,
        enabled: false
        
      }
    );

    const {loading:AllLeagueLoading, error:AllLeagueError, data:AllLeagueData} = useQuery(
      queries.LOAD_LEAGUES,
      {
        fetchPolicy: 'cache-and-network',
        manual: true,
        refetchOnWindowFocus: false,
        enabled: false
        
      }
    );
  
    const handleDate = (date) => {
      setDate(date)
      refetch({ 
        date: date}
    );
    }
   

    if (data && LeagueData && AllLeagueData) {
      const {FixtureByDateInformation} = data;
      const {TopLeaguesInformation} = LeagueData;
      const {LeagueInformation} = AllLeagueData;
      return (
          <div class="row justify-content-center" id='home' >
             
             <div class="col-md-3">
                <div className="wsk-cp-matches" >
                  <h1 className='tl_header'>Top Leagues</h1> <br></br>
                  {TopLeaguesInformation.map((x) => {
                    // console.log(x.id)
                    return(
                      <Link to={`/league/${x.id}`}>
                        <div className='row col-md-12'>
                          <button type="button" class="btn top-leagues" >
                          <div class="row m-6">
                            <div class="col-md-4">
                              <div>
                              <img alt="Leaguelogo" class=" ml-auto img-fluid leagueimg" src={x.logo} />  
                              </div>
                            </div>
                            <div class="col-md-6  ">
                              <div>
                                <p>{x.leagueName}</p>
                              </div>
                            </div>
                          </div>
                          </button>
                         <br></br>
                        </div>
                      </Link>
                    )
                  })}
                  <br></br>
                  <br></br>
                  </div>
                  <Accordion defaultActiveKey="1">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>All Leagues</Accordion.Header>
                    <Accordion.Body>
                        {LeagueInformation.map((x) => {
                        return(
                          <div className='row col-md-12'>
                        <button type="button" class="btn all-leagues">
                        <div class="row m-6">
                          <div class="col-md-4">
                            <div>
                            <img alt="Leaguelogo" class=" ml-auto img-fluid leagueimg" src={x.logo} />  
                            </div>
                          </div>
                          <div class="col-md-6  ">
                            <div>
                              <p>{x.leagueName}</p>
                            </div>
                          </div>
                          </div>
                          </button> <br></br>
                      </div>
                        )
                      })}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
</div>
                 
             

             <div class="col-md-6">
             <div className="wsk-cp-matches" >

             <DatePicker selected={getDate} onChange={(date) => handleDate(date)} dateFormat="yyyy-MM-dd" className="form-control" placeholderText='Select Date'/>
             <br></br>
              <br></br>
              {FixtureByDateInformation.map((x) => {

                return(
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
                )
              })}
             </div>
            </div>

            <div className='col-md-3'>

            </div>
            {/* <div class="col-md-3">
              
                <div className="wsk-cp-product" key="1">
                  <div className="wsk-cp-img">
                        <img src="https://www.supastrikas.com/sites/default/files/team/badges/Supa_Strikas_0.png" alt="news" className="img-responsive" />
                  </div>
                  <div className="wsk-cp-text">
                      <div className="title-product">
                        <h1>News Title</h1>
                      </div>
                      <div className="description-prod">
                        <p><strong>Description</strong> : Description for the news
                            <br></br>
                        </p>               
                      </div>
                                      
                                      
                                
                  </div>
                </div>

            



            </div> */}
                          
                            
           


          </div>   
            
        )
          
    } 
    else if (loading || LeagueLoading || AllLeagueLoading ) 
    {

      return <div class="spinner-border m-5" role="status">
      
    </div>
    }
    else if (error || LeagueError || AllLeagueError) 
    {
      return <div class="alert alert-danger" role="alert">
          {error.message || LeagueError.message || AllLeagueError.message}
          </div>;
    }

}
export default Landing;
