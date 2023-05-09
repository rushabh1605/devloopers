import React from 'react';
import { Link, useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import queries from '../queries';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery,useMutation } from "@apollo/client";
import NotFoundPage from "./NotFound"
import {Card} from 'react-bootstrap'

const SingleTeam = () => {
    const sessionToken = JSON.parse(sessionStorage.getItem('sessionToken'));
    console.log(sessionToken.Login._id)

    let { teamId } = useParams();
    // console.log(teamID);
    let teamID = parseInt(teamId)
    console.log(teamID);
    console.log(typeof(teamID));

   const { loading, error, data, refetch } = useQuery(
    queries.LOAD_TEAM_INFO, {
        fetchPolicy: 'cache-and-network',
        variables:{teamID: teamID},
        manual: true,
        refetchOnWindowFocus: false,
        enabled: false
    }
);
const { loading:userLoading, error:userError, data:userData } = useQuery(
    queries.GET_USER_BY_ID, {
        fetchPolicy: 'cache-and-network',
        variables:{id: sessionToken.Login._id},
        manual: true,
        refetchOnWindowFocus: false,
        enabled: false
    }
)



const [mutate,{loading:followLoading, error:followError, data:followData }] = useMutation(queries.LOAD_TEAM_FOLLOWING);
const [unmutate,{loading:unfollowLoading, error:unfollowError, data:unfollowData }] = useMutation(queries.LOAD_TEAM_UNFOLLOWING);
const handle_follow = (event) => {
    
    mutate({
        
        variables:{
           
            userId: sessionToken.Login._id,
            teamID: teamID,
            
        },
        refetchQueries:[{
            query : queries.GET_USER_BY_ID,
            variables:{
                id:sessionToken.Login._id
            }
        }]
      
       
  })
      
       
  }
  const handle_unfollow = (event) => {
    
    unmutate({
        
        variables:{
           
            userId: sessionToken.Login._id,
            teamID: teamID,
            
        },
        refetchQueries:[{
            query : queries.GET_USER_BY_ID,
            variables:{
                id:sessionToken.Login._id
            }
        }]
      
       
  })
      
       
  }






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
if(data || userData){   

    console.log(sessionToken.Login.isPremium )

        const {TeamInformation} = data

        const {GetUserById} = userData
        const followers_list = GetUserById.followingTeamID

        console.log(TeamInformation)
        let Flag = false
          if(TeamInformation === null){
            
            return(<div class="alert alert-danger" role="alert">
            Team data not avaiable
            </div>)
            
          }
      else{
        return(
        
            <div class="row justify-content-center" id='home'  >
                    <div className='col-md-11'>
                        <div className="wsk-cp-matches mt-3" >
                              <div className="col-md-10 d-flex">
                                  <img alt="teamlogo" class=" img-fluid leagueimg" src={TeamInformation.teamLogo} />
                                  <div className="d-block">
                                  
                                      {/* <p className="mr-4 tablehead">{TeamInformation.teamName}</p> */}
                                  

                                  <div className="d-flex"> 
                                      <p className="ml-2 tablehead">{TeamInformation.teamName}</p>


                                <div className='d-flex'>
                                { sessionToken  && sessionToken.Login.isPremium ===true ?(
                                <>          

                        { followers_list.includes(teamID.toString())?(
                            <div className='col-md-4'>
                            <button className='btn btn-success' onClick={(event) => handle_unfollow()}>UNFOLLOW</button>
                            </div>
                            
                        )
                        : (
                        <div className='col-md-4'>
                            <button className='btn btn-success' onClick={(event) => handle_follow(event)}>FOLLOW</button>
                            </div>)
                        }
                        </>
                    )
                        
                        
                    :(
                        <div>
                        
                    </div>
                    )
                    
                    }





                                  </div>
                                  
                              </div>
                              </div>
                                    
                        </div>
                    </div>
    
                    <div className='col-md-11'>
                        <div className='row'>
                        <div className='col-md-3 mr-5 ml-2 p-0'>
                            <div className="wsk-cp-matches " >
                                <div className='row'>
                                <h5 className='tablehead'>Team Information</h5>
                            </div>
                        
                                <div className='row mt-5'>
                                    <div className='col-md-6'>
                                        <p className="tablehead">Founded In</p>
                                    </div>
                                    <div className='col-md-6'>
                                        <p className="tablehead">Team Country</p>
                                    </div>
                                    {/* <div className='col-md-4'>
                                        <p className="tablehead">Age</p>
                                    </div> */}
                                </div>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <p className="tablehead">{TeamInformation.founded}</p>
                                    </div>
                                    <div className='col-md-6'>
                                        <p className="tablehead">{TeamInformation.countryName}</p>
                                    </div>
                                    {/* <div className='col-md-4'>
                                        <p className="tablehead">{TeamInformation.age}</p>
                                    </div> */}
                                </div>
                                {/* <hr
                                  style={{
                                  background: "#D3D3D3",
                                  height: "2px",
                                  border: "none",
                                  opacity:0.1
                                  }}
                                />
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <p className="tablehead">Nationality</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">Position</p>
                                    </div>
                                    
                                </div>
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <p className="tablehead">{TeamInformation.Nationality}</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">{TeamInformation.playerPosition}</p>
                                    </div>
    
                                </div> */}
                            </div>
    
                        </div>
    
                        {/* card 2 */}
    
                        <div className='col-md-3  p-0'>
                            <div className="wsk-cp-matches " >
                                <div className='row'>
                                    <h5 className='tablehead'>Team Stadium</h5>
                                </div>
                                
                                <div className='row mt-4'>
                                    <div className='col-md-6'>
                                        <p className="tablehead">Stadium</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">Capacity</p>
                                    </div>
                                    {/* <div className='col-md-4'>
                                        <p className="tablehead">Assists</p>
                                    </div> */}
                                    
                                    
                                </div>
                                <div className='row '>
                                    <div className='col-md-6'>
                                        <p className="tablehead">{TeamInformation.venueName}</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">{TeamInformation.capacity}</p>
                                    </div>
                                    {/* <div className='col-md-4'>
                                        <p className="tablehead">{TeamInformation.assists}</p>
                                    </div> */}
                                    
                                </div>
                               
                            </div>                        
                          </div>


                         {/* card 3 */}
    


                          <div className='col-md-3  p-0'>
                            <div className="wsk-cp-matches " >
                                <div className='row'>
                                    <h5 className='tablehead'>Stadium Picture</h5>
                                </div>
                                
                                <div className='row mt-4'>
                                <div className='col-md-6'>
                                      <img alt="venueImg" className="img-fluid" src={TeamInformation.venueImage} />
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">Capacity</p>
                                    </div>

                                    
                                    
                                </div>
                                <div className='row '>
                                    <div className='col-md-6'>
                                        <p className="tablehead">{TeamInformation.venueName}</p>
                                    </div>
                                    <div className='col-md-4'>
                                        <p className="tablehead">{TeamInformation.capacity}</p>
                                    </div>

                                    
                                </div>
                               
                            </div>                        
                          </div>




                        
    
                        </div>
                    </div>
                    
                    
    
    
    
    
            </div>
              </div>  
          
        )
        
      }
    
}

};

export default SingleTeam;

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
