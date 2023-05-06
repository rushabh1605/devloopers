import React from "react";
import { Link, useParams } from "react-router-dom";

const LeagueStats = () => {

    let { leagueId } = useParams();

    leagueId = parseInt(leagueId)
    console.log(leagueId)

 return (
    <p> LeagueStats page {leagueId}</p>
 )
}

export default LeagueStats