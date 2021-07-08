import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './auth.css';
import Register from './register';
import Login from './login';

function Auth(){

    const [authType, setAuthType] = useState('login');

    return (
        <div id="auth" className="container">
            <div className="row text-center auth-head-text">
                <a href="#" onClick={() => setAuthType('login')} className={"col-6 auth-a " + (authType =='login' ? 'head-active':'head-inactive')}>
                    LOGIN
                </a>
                <a href="#" onClick={() => setAuthType('signup')} className={"col-6 auth-a " + (authType =='signup' ? 'head-active':'head-inactive')}>
                    REGISTER
                </a>
            </div>
            {authType == 'login' ? <Login/> : <Register/>}
        </div>
    );
}

export default Auth;