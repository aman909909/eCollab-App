import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Auth from '../auth/auth';
import RoomHome from './room-home';
import RoomDetails from './room-details';
import Navbar from '../navbar/navbar';
import './rooms.css';

function Room(){
    const { id } = useParams();
    const [token, setToken] = useCookies(['mr-token']);

    return (
        <span>
            <Navbar/>
            {token['mr-token'] ?
                <span>
                    {id ? <RoomDetails id={id}/> : <RoomHome/>}
                </span>
            
            
            
            
            :<Auth/>}
        </span>
    );
}

export default Room;