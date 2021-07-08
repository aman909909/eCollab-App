import React, { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';
import './navbar.css';


function Navbar(){

    const [ token, setToken, deleteToken] = useCookies(['mr-token']);

    const logoutUser = () => {
        deleteToken(['mr-token']);
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand">eCollab</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                </button>
                {console.log(token)}
                {token['mr-token'] ? 
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto mr-5">
                                <li className="nav-item active mr-4">
                                    <a className="nav-link" href="#" onClick={() => window.location='/room'}>Dashboard <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item active">
                                    <a className="nav-link" href="#" onClick={logoutUser} >Logout <span className="sr-only">(current)</span></a>
                                </li>
                            </ul>
                        </div>
                    :null
                }
            </nav>
        </div>
    );
}

export default Navbar;