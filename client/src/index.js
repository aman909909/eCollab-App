import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import App from './App';
import Auth from './components/auth/auth';
import Room from './components/rooms/rooms';
import RoomCard from './components/rooms/room-card';
import Message from './components/messages/messages';

const routes = (
  <BrowserRouter>
     <CookiesProvider>
        <Route exact path="/room" component={Room}/>
        <Route path="/room/:id" component={Room}/>
        <Route exact path="/auth" component={Auth}/>
        <Route exact path="/test/:id" component={Message}/>
     </CookiesProvider>
  </BrowserRouter>
)

ReactDOM.render(
  routes,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
