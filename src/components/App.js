import React, {useState, useEffect} from 'react';
import {fetchCurrentGuest, storeCurrentGuest, storeCurrentMeeting} from "../services/LocalStorage";
import Route from '../router/Route';
import Header from './Header';
import LandingPage from './LandingPage';
import Footer from './Footer';
import CreateMeeting from './CreateMeeting';
import JoinMeeting from './JoinMeeting';
import Meeting from './Meeting';

const App = () => {
   const [currentGuest, setCurrentGuest] = useState({id: null, name: ''});

   //fetch the meetingID and guest from localStorage on first app load
   useEffect(
      () => {
         setCurrentGuest(fetchCurrentGuest());
      }
      , []
   );

   //update state variable and localStorage,
   //should be passed as prop in place of setState functions
   const onUpdateGuest = (guest) => {
      storeCurrentGuest(guest);
      setCurrentGuest(guest);
   }

   //update state variable and localStorage,
   //should be passed as prop in place of setState functions
   const onUpdateMeetingID = (meetingID) => {
      storeCurrentMeeting(meetingID);
   }

   return (
      <div>
         <Header/>
         <Route path='/'> <LandingPage currentGuest={currentGuest}/> </Route>
         <Route path='/create'>
            <CreateMeeting
               currentGuest={currentGuest}
               onUpdateGuest={onUpdateGuest}
               onUpdateMeetingID={onUpdateMeetingID}
            />
         </Route>
         <Route path='/join'>
            <JoinMeeting
               onUpdateMeetingID={onUpdateMeetingID}
            />
         </Route>
         <Route path='/meeting'>
            <Meeting
               currentGuest={currentGuest}
               onUpdateGuest={onUpdateGuest}
               onUpdateMeetingID={onUpdateMeetingID}
            />
         </Route>
         <Footer/>
      </div>
   );
};

export default App;
