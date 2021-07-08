import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import RoomPassword from './room-password';
import RoomCard from './room-card';
import Chat from '../messages/chat';

let FontAwesome = require('react-fontawesome');

function RoomDetails(props){
    const [room, setRoom] = useState(null);
    const [token, setToken] = useCookies(['mr-token']);
    const [allow, setAllow] = useState(false);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/rooms/${props.id}`,{headers: {
            'x-access-token': `${token['mr-token']}`,
        }})
        .then(res => {
            setAllow(res.data.allow, setRoom(res.data.room));
        })
        .catch(err => console.log(err.response))
    }, []);

    return (
        <div>
            {allow ? <div>
                        {room && <span className="mb-5" id="room-details-heading">{room.name}
                            <FontAwesome className="room-details-share" name="share-alt" 
                                onClick={() => {navigator.clipboard.writeText(`http://localhost:3000/room/${room._id}`)}}>
                                <span className="room-details-copy-text">Click to copy</span>
                            </FontAwesome>
                        </span>}
                        {room && <span className="mb-5" id="room-details-desc">{room.description}</span>}
                        
                        {room ?
                            <div className="">
                                <span className="mt-5"><Chat id={room._id} token={token}/></span> 
                            </div>
                        : null}
                    </div>

            : <RoomPassword id={props.id}/>}
        </div>
    );
}


export default RoomDetails;