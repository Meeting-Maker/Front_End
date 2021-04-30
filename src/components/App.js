import React, {useState} from 'react';

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
   const [meetingDetails, setMeetingDetails] = useState({userName: '', meetingName: '', pollType: 0});
   const [candidateMeetings, setCandidateMeetings] = useState([]);

   return (
      <div>
         <Header />
         <Route path='/'> <LandingPage currentUser={currentUser}/> </Route>
         <Route path='/login' > <Login currentUser={currentUser}/> </Route>
         <Route path='/register'> <Register currentUser={currentUser}/> </Route>
         <Route path='/create'>
            <CreateMeeting
               currentUser={currentUser}
               setCurrentUser={setCurrentUser}
               meetingDetails={meetingDetails}
               setMeetingDetails={setMeetingDetails}
               candidateMeetings={candidateMeetings}
               setCandidateMeetings={setCandidateMeetings}
            />
         </Route>
         <Route path='/join'> <JoinMeeting currentUser={currentUser}/> </Route>
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
         <Footer/>
      </div>
   );

};

export default App;
