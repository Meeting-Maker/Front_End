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
import Meeting from './Meeting';

const App = () => {
   const [currentUser, setCurrentUser] = useState({userID: null});
   const [meetingDetails, setMeetingDetails] = useState({userName: 'brandon', meetingName: 'mymeeting', pollType: 0});
   const [candidateMeetings, setCandidateMeetings] = useState([]);

   return (
      <div>
         <Header></Header>

         <Route path='/'> <LandingPage/> </Route>
         <Route path='/login'> <Login/> </Route>
         <Route path='/register'> <Register/> </Route>
         <Route path='/create-meeting'>
            <CreateMeeting
               currentUser={currentUser}
               setCurrentUser={setCurrentUser}
               meetingDetails={meetingDetails}
               setMeetingDetails={setMeetingDetails}
               candidateMeetings={candidateMeetings}
               setCandidateMeetings={setCandidateMeetings}
            />
         </Route>
         <Route path='/join-meeting'> <JoinMeeting/> </Route>
         <Route path='/meeting'>
            <Meeting
               currentUser={currentUser}
               setCurrentUser={setCurrentUser}
               meetingDetails={meetingDetails}
               setMeetingDetails={setMeetingDetails}
               candidateMeetings={candidateMeetings}
               setCandidateMeetings={setCandidateMeetings}
            />
         </Route>

         <Footer></Footer>
      </div>
   );

};

export default App;
