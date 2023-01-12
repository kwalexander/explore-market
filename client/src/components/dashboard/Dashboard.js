import React from 'react';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';

function Dashboard () {

    //const { data: me}  = useQuery(GET_ME);
    

    return (
        <>
        <h1>Hello world!</h1>
       {/* <p>{me.username}</p> */}
        </>
    )
};

export default Dashboard;