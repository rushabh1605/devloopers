import React from "react";
import { Link, useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import queries from '../queries';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from "@apollo/client";

const SingleLeague = () => {

    let { leagueId } = useParams();

    const { loading, error, data, refetch } = useQuery(
        queries.LOAD_STANDINGS, {
            fetchPolicy: 'cache-and-network',
            variables:{leagueId},
            manual: true,
            refetchOnWindowFocus: false,
            enabled: false
        }
    )

    console.log(data)

    if(data){
        return(
            (data.map((x) => {
                return (
                    <p>x.rank</p>
                )
            }))
        )
    }



return (
    
    <Accordion.Body>
        <p>Hi League data</p>
    </Accordion.Body>
)
}

export default SingleLeague