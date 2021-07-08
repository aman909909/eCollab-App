import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import RoomForm from './create-form';
import JoinRoom from './join-room';

var FontAwesome = require('react-fontawesome');

const getBackgroundColor = type =>{
    if(type == 'owner') return 'room-card-yellow';
    else if(type == 'all') return 'room-card-trending-color';
    else return 'room-card-purple';
}

function RoomCard(props){
    return (
            <div class="card room-card" onClick={() => window.location = `/room/${props.room._id}`}>
                <FontAwesome className="room-card-lock" name={"lock"+ (props.room.public ? '-open':'')}/>
                <div id="test" className={"card-header room-card-header " + (getBackgroundColor(props.type))}>
                    {props.room.name}
                    <span> {props.type == 'trending' ? `#${props.index+1}`:null}</span>
                </div>
                <div class="card-body p-2">
                    <p className="room-card-desc">{props.room.description && props.room.description.slice(0,30)}
                    {props.room.description && props.room.description.length > 30 ? <span>...</span>:''}</p>
                </div>
            </div>
    );
}

export default RoomCard;