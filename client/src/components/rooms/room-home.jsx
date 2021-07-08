import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import RoomForm from './create-form';
import JoinRoom from './join-room';
import RoomCard from './room-card';

var FontAwesome = require('react-fontawesome');


function RoomHome(){

    const [token, setToken] = useCookies(['mr-token']);
    const [form, setForm] = useState(false);
    const [join, setJoin] = useState(false);
    const [ownerRooms, setOwnerRooms] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [trend, setTrend] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/rooms/all-owner-rooms`,{headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${token['mr-token']}`,
        }})
        .then(res => {
            setOwnerRooms(res.data);
        })
        .catch(err => console.log("Error" + err.response))
    }, []);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/rooms/all-user-rooms`,{headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${token['mr-token']}`,
        }})
        .then(res => {
            setRooms(res.data);
        })
        .catch(err => console.log(err.response))
    }, []);
    useEffect(() => {
        axios.get(`http://localhost:8000/api/rooms/public-trending`,{headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${token['mr-token']}`,
        }})
        .then(res => {
            console.log(res.data);
            setTrend(res.data);
        })
        .catch(err => console.log(err.response))
    }, []);
    return(
        <div className="room-home-row row m-0" style={{zIndex:1}}>
            {form ? <RoomForm setForm={setForm}/>:null}
            {join ? <JoinRoom setJoin={setJoin}/>:null}
            <div style={form || join ? {opacity:'10%'}:null} className="col-md-3 col-12 p-5">
                <div onClick={() => setForm(!form)} className="text-center room-home-button second">Create Room</div>
                <div onClick={() => setJoin(!join)} className="text-center btn room-home-button first">Join Room</div>
                <div className="room-home-trending">
                    <span className="room-home-trending-heading">Trending in Public <FontAwesome style={{color:'orange'}} name="fire"/></span>
                    <div className="mt-5">
                        {trend.map((room, index) =>{
                                return(
                                    <div className="m-3 p-2"><RoomCard type="trending" index={index } room={room}/></div>
                                );
                        })}
                    </div>
                </div>
            </div>
            <div style={form || join ? {opacity:'10%'}:null} className="col-md-8 col-12 p-5">
                <div className="text-light room-home-header">YOUR ROOMS</div>
                <div className="row">
                        {ownerRooms.map((room) =>{
                            return(
                                <div className="col-md-3 col-11 m-3 p-2"><RoomCard type="owner" room={room}/></div>
                            );
                        })}
                </div>
                <div className="text-light mt-5 room-home-header">ALL ROOMS</div>
                <div className="row">
                        {rooms.map((room) =>{
                            return(
                                <div className="col-md-3 col-11 m-3 p-2"><RoomCard type="all" room={room}/></div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default RoomHome;

