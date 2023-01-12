import React from 'react';
import Auth from '../../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';

function Dashboard (props) {

    const  { loading, data }  = useQuery(GET_ME);
    console.log(data);
    // if ( !me ) {
    //     return <div>Loading...</div>;
    // }

    return (
        <>

        { loading ? (
            <h1> Loading ... </h1>
        ) : (
            <h1 className="mt-5 mb-5">Hello {data.me.username}</h1>
        )}
        </>
    )
};

export default Dashboard;