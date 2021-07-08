import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import './messages.css';
import bg from './bg.jpg';

const CONNECTION_PORT = "http://localhost:8001";
let socket;

function Chat(props) {
    const [info, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);


    useEffect(() => {
        socket = io(CONNECTION_PORT, {query: `roomid=${props.id}`});
    },[CONNECTION_PORT]);

    useEffect(() => {
        socket.on('init', (msg) => {
            let text = [];
            //Optimise this O(n) in backend
            for(let i=0;i<msg.length;i++) text.push({data: msg[i].message, author: msg[i].author});
            let msgReversed = text.reverse();
            setMessageList([...messageList, ...msgReversed]);
        });
    });
    useEffect(() => {
        socket.on('push', (msg) => {
            setMessageList([...messageList, {data: msg.message, author: msg.author}]);
        });
    });
    useEffect(() => {
        socket.on('error', function (err) {
            console.log(err);
        });
    })
    const infoChanged = evt =>{
        setMessage(evt.target.value);
    }
    const submitClicked = event => {
        event.preventDefault();
        let send = {
            data : info,
            author: props.token['mr-token'],
            room: props.id
        }
        
        socket.emit('message', send);
        setMessage('');
    }

    return (
        <div className="bg-light chat-all">
            <div style={{backgroundImage:{bg}}}  id="chat-main" >
                {messageList.map((mess, ind) => {   
                    return(
                        <span key={ind} id="chat-message"><span id="chat-author">{mess.author}</span>:  {mess.data}</span>
                    );
                })}
            </div>
            <div id="chat-action">
                <div className="input-group">
                    <input placeholder="Type here..." value={info} onChange={infoChanged}  type="text" className="form-control"/>
                    <button onClick={submitClicked} className="btn btn-primary chat-btn-send">Send</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;