import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
var FontAwesome = require('react-fontawesome');

function JoinRoom(props){

    const [token, setToken] = useCookies(['mr-token']);
    const [roomid, setRoomid] = useState('');
    const [error, setError] = useState(null);


    const submitClicked = () =>{
        axios.get(`http://localhost:8000/api/rooms/${roomid}`, {headers: {
            'x-access-token': `${token['mr-token']}`,
        }})
        .then(res => {
            console.log(res)
            window.location = `/room/${roomid}`
        })
        .catch(err => {
            console.log(err.response);
            setError(err.response.data.error);
        });
    };
    
    return (
        <div style={{zIndex:2}} className="roomform">
            <span onClick={() => props.setJoin(false)} className="create-form-cross"><FontAwesome name="close"/></span>
            <div className="mb-5">Enter Room ID to join a room:</div>
            <input type="text" onChange={(evt) => setRoomid(evt.target.value)} value={roomid} className="join-room-input form-control mb-4"></input>
            {error ? <span className="text-danger">{error}</span> : null}
            <button onClick={submitClicked} className="btn create-form-button">Join</button>
        </div>
    );
}


export default JoinRoom;