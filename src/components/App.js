import React, {useState, useEffect} from 'react';
import {Navbar} from 'react-bootstrap';

import Route from '../router/Route';

import Header from './Header';
import LandingPage from './LandingPage';
import Footer from './Footer';
import Login from './Login';
import CreateMeeting from './CreateMeeting';
import JoinMeeting from './JoinMeeting';
import Register from './Register';

const App = () => {

  return (
    <div>
      <Header></Header>

      <Route path='/'> <LandingPage /> </Route>
      <Route path='/login'> <Login/> </Route>
      <Route path='/register'> <Register/> </Route>
      <Route path='/create-meeting'> <CreateMeeting/> </Route>
      <Route path='/join-meeting'> <JoinMeeting/> </Route>

      <Footer></Footer>
    </div>
  );

};

export default App;
