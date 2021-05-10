import React, {useState, useEffect} from 'react';
import {fetchCurrentGuest, storeCurrentGuest} from "../services/LocalStorage";
import Route from '../router/Route';
import Header from './Header';
import LandingPage from './LandingPage';
import Footer from './Footer';
import CreateMeeting from './CreateMeeting';
import JoinMeeting from './JoinMeeting';
import Meeting from './Meeting';
import ProfilePage from './ProfilePage';
import CreateGuest from './CreateGuest';
import MeetingDetails from "./MeetingDetails";
import UserList from "./UserList";

const App = () => {
   const [currentGuest, setCurrentGuest] = useState({id: null, name: ''});
   const [meetingID, setMeetingID] = useState('');

   useEffect(
      () => {
         setCurrentGuest(fetchCurrentGuest());
      }
      , []
   );

   const onUpdateGuest = (guest) => {
      storeCurrentGuest(guest);
      setCurrentGuest(guest);
   }

   return (
      <div>
         <Header/>
         <Route path='/'> <LandingPage currentGuest={currentGuest}/> </Route>
         <Route path='/create'>
            <CreateMeeting
               currentGuest={currentGuest}
               setCurrentGuest={onUpdateGuest}
               meetingID={meetingID}
               setMeetingID={setMeetingID}
            />
         </Route>
         <Route path='/join'>
            <JoinMeeting
               currentGuest={currentGuest}
               setMeetingID={setMeetingID}
            />
         </Route>
         <Route path='/meeting'>
            <Meeting
               currentGuest={currentGuest}
               setCurrentGuest={onUpdateGuest}
               meetingID={meetingID}
            />
         </Route>
         <Footer/>
      </div>
   );
};

export default App;
