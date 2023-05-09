import React from 'react';
import { Link, useParams } from "react-router-dom";
import queries from '../queries';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery,useMutation} from "@apollo/client";
import NotFoundPage from "./NotFound"

const moment = require('moment');
const Score = () => {

    let userID ="644801104403065762287e6c";

//   const {loading, error, data} = useQuery(
//     queries.LOAD_GAME_BY_USERID,
//     {
//       fetchPolicy: 'cache-and-network',
//       variables:{id:userID},
//       manual: true,
//       refetchOnWindowFocus: false,
//       enabled: false
      
//     }
//   );

  
  const {loading, error, data} = useQuery(
    queries.LOAD_GAME_BY_USERID,
    {
      fetchPolicy: 'cache-and-network',
      variables:{id:userID},
      manual: true,
      refetchOnWindowFocus: false,
      enabled: false
      
    }
  );
//   const [mutate,{loading: loadingmutation, error: errormutation, data: datamutation }] = useMutation(queries.);
//   const handle_createGame = (event,home,away,bet,fixture) => {
//     console.log(home,away,fixture,bet)
//     mutate({
        
//         variables:{
//             fixtureID: fixture,
//             userID: userID,
//             awayTeam: parseInt(away),
//             homeTeam:parseInt(home),
//             betField: parseInt(bet),
            
//         },
//         refetchQueries:[{
//             query : queries.LOAD_GAME_BY_USERID,
//             variables:{
//                 id:userID
//             }
//         }]
      
       
//   })
  
//   }

if(loading){
    return(
        <div class="spinner-border m-5" role="status">
  
        </div>
    )
} else if (error ) {
    
    return(
        <NotFoundPage />
    )
}


if(data ){
    
    const {getGameByUserId} = data
    
  
    return(
        <div className="row justify-content-center" id='home'>
            {getGameByUserId.map((x) => {
                
                return(
                        <div>
                            <p>{x.result}</p>
                        </div>
                    );
            })}
        </div>

    )
    
}

};

export default Score;


