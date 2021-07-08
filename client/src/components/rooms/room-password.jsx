import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';


function RoomPassword(props){

    const [token, setToken] = useCookies(['mr-token']);
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);


    const submitClicked = () =>{
        axios.post(`http://localhost:8000/api/rooms/auth/${props.id}`, { password },{headers: {
            'x-access-token': `${token['mr-token']}`,
        }})
        .then(res => {
            console.log(res.data);
            window.location = `/room/${res.data._id}`
        })
        .catch(err => {
            setError(err.response.data.error);
        });
    };
    
    return (
        <div className="roomform">
            <div className="text-center room-password-text-main">Looks like you are not a member of this room.</div>
            <h4 className="text-center mb-5 mt-3">Enter Password to join the room</h4>
            <input onChange={(evt) => setPassword(evt.target.value)} value={password} className="form-control mb-4" type="password"></input>
            {error ? <span className="text-danger">{error}</span> : null}
            <button disabled={!password.length} onClick={submitClicked} className="btn create-form-button">Join</button>
        </div>
    );
}


export default RoomPassword;