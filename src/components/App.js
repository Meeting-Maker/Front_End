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
import ProfilePage from './ProfilePage';
import CreateGuest from './CreateGuest';

const App = () => {
   const [currentUser, setCurrentUser] = useState({userID: null});
   const [meetingID, setMeetingID] = useState('');

   return (
      <div>
         <Header />
         <Route path='/'> <LandingPage currentUser={currentUser}/> </Route>

         {/*<Route path='/createGuest'><CreateGuest/></Route>*/}

         <Route path='/create'>
            <CreateMeeting
               currentUser={currentUser}
               setCurrentUser={setCurrentUser}
               meetingID={meetingID}
               setMeetingID={setMeetingID}
            />
         </Route>
         <Route path='/join'>
            <JoinMeeting
               currentUser={currentUser}
               setMeetingID={setMeetingID}
            />
         </Route>
         <Route path='/meeting'>
            <Meeting
               currentUser={currentUser}
               meetingID={meetingID}
            />
         </Route>
         <Footer/>
      </div>
   );
};

export default App;
