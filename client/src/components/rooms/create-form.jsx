import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './rooms.css';
var FontAwesome = require('react-fontawesome');


function RoomForm(props){

    const [token, setToken] = useCookies(['mr-token']);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [desc, setDesc] = useState('');
    const [isPublic, setPublic] = useState(false);

    const submitClicked = () => {
        axios.post(`http://localhost:8000/api/rooms/create`,{name, password, desc, isPublic}, {headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${token['mr-token']}`,
        }})
        .then(res => {
            console.log("res is "+res.data);
            window.location = `room/${res.data._id}`
        })
        .catch(err => console.log("Error" + err.response))
    }

    return (
        <div style={{zIndex:2}} className="m-0 roomform">
            <span onClick={() => props.setForm(false)} className="create-form-cross"><FontAwesome name="close"/></span>
            <form>
                <div class="form-row m-0">
                    <div class="form-group col-md-6">
                    <label>Name</label>
                    <input onChange = {(evt) => setName(evt.target.value)} value={name} type="text" class="form-control"placeholder="Enter Room name"/>
                    </div>
                    <div class="form-group col-md-6">
                    <label >Password</label>
                    <input disabled={isPublic} onChange = {(evt) => setPassword(evt.target.value)} value={password} type="password" class="form-control" placeholder="Password"/>
                    </div>
                </div>
                <div class="form-group mt-4 mb-5">
                    <label>Description</label>
                    <input onChange = {(evt) => setDesc(evt.target.value)} value={desc} type="text" class="form-control" placeholder="What is your room about?"/>
                </div>
                <span>Public: </span>
                <div class="form-check form-check-inline" onClick={() => setPublic(true)}>
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" value="option1"/>
                    <label class="form-check-label" for="inlineRadio1">Yes</label>
                </div>
                <div class="form-check form-check-inline" onClick={() => setPublic(false)}>
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
                    <label class="form-check-label" for="inlineRadio2">No</label>
                </div>
                <div className="text-secondary mt-3" style={{fontSize:'1.1rem'}}>* Anyone can join a public room without password.</div>
                <br></br>
                <div onClick={submitClicked} className="btn create-form-button">Create</div>
            </form>
        </div>
    );
}

export default RoomForm;