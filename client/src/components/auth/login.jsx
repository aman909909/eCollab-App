import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css';
import axios from 'axios';
let FontAwesome = require('react-fontawesome');

function Register(){

    const [token, setToken ] = useCookies(['mr-token']);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const submitClicked = () =>{
            axios.post(`http://localhost:8000/api/auth/login`, { username, password})
            .then(res => {
                setToken('mr-token', res.data.token)
            })
            .catch(err => setError(err.response.data.error))
    }

    return (
        <div className="container register-container">
            <div className="form-group">
                <label htmlFor="username">USERNAME</label>
                <input autoComplete="off" onChange={(evt) => setUsername(evt.target.value)} value={username} type="text" className="form-control register-input" id="username"placeholder="Enter Username"/>
            </div>
            <div className="form-group">
                <label htmlFor="password">PASSWORD</label>
                <input onChange={(evt) => setPassword(evt.target.value)} value={password} type="password" className="form-control register-input" id="password" placeholder="Password"/>
            </div>
            <div>{error ? <span className="text-danger">{error}</span>:null}</div>
            <button disabled={!username.length} onClick={submitClicked} type="submit" className="btn create-form-button">Login</button>
        </div>
    );
}

export default Register;