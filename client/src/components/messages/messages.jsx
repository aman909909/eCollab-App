import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Chat from './chat.jsx';
const CONNECTION_PORT = "localhost:8001";
let socket;
function Messages() {
    
    const [token, setToken] = useCookies(['mr-token']);
    const { id } = useParams();
        return (
            <div>
                <div> <Chat id={id} token={token}/> </div>
            </div>
        );
}

export default Messages;