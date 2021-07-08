import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css';

let FontAwesome = require('react-fontawesome');

function Register(){

    const [token, setToken ] = useCookies(['mr-token']);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [usernameAvailable, setUsernameAvailable] = useState(true);

    const usernameChanged = async evt => {
        let changedUsername = evt.target.value;
        setUsername(changedUsername, 
            fetch('http://localhost:8000/api/users/available', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'username': changedUsername,
                })
                }).then( resp => resp.json()).then(res => setUsernameAvailable(res.available))
                .catch( error => console.log(error))  
        );

    }

    const submitClicked = () =>{
        fetch('http://localhost:8000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': username,
                'name': name,
                'password': password
            })
            }).then( resp => resp.json()).then(res => setToken('mr-token', res.token))
            .catch( error => console.log(error))  
    
    }

    return (
        <div className="container register-container">
            <div className="form-group">
                <label>FULL NAME</label>
                <input id="register-input" autoComplete="off" onChange={(evt) => setName(evt.target.value)} value={name} type="text" className="form-control" placeholder="Aman Ashish"/>
            </div>
            <div className="form-group">
                <label>USERNAME</label>
                <input id="register-input" autoComplete="off" onChange={usernameChanged} value={username} type="text" className={"form-control border-bottom border-" + 
                (usernameAvailable ? 'success':'danger')} placeholder="Pick a username"/>
                {username.length == 0 ? null:
                    <span>
                    {usernameAvailable ? <span><span className="check mr-2"></span > <span>Username available</span></span>
                    : <span><FontAwesome className="text-danger mr-2" name="close"/><span >Username not available, login if it is you.</span></span>
                    }
                    </span>
                }
            </div>
            <div className="form-group">
                <label htmlFor="password">PASSWORD</label>
                <input id="register-input" autoComplete="off" onChange={(evt) => setPassword(evt.target.value)} value={password} type="password" className="form-control" placeholder="Password"/>
            </div>
            <button disabled={!usernameAvailable || password.length==0 || username.length==0} onClick={submitClicked} type="submit" className="btn create-form-button">Register</button>
        </div>
    );
}

export default Register;