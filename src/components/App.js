import React, {useState, useEffect} from 'react';
import {fetchCurrentGuestSession, storeCurrentGuestSession, storeCurrentGuestLocal  , storeCurrentMeeting} from "../services/Storage";
import Route from '../router/Route';
import Header from './Header';
import LandingPage from './LandingPage';
import Footer from './Footer';
import CreateMeeting from './CreateMeeting';
import JoinMeeting from './JoinMeeting';
import Meeting from './Meeting';
import EditMeeting from "./EditMeeting";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
   const [currentGuest, setCurrentGuest] = useState({id: null, name: '', role: null});

   //fetch the meetingID and guest from localStorage on first app load
   useEffect(
      () => {
         setCurrentGuest(fetchCurrentGuestSession());
      }
      , []
   );

   //update state variable and localStorage,
   //should be passed as prop in place of setState functions
   const onUpdateGuest = (guest) => {
      console.error('CURRENT GUEST: ', currentGuest);
      storeCurrentGuestSession(guest);
      storeCurrentGuestLocal(guest);
      setCurrentGuest(guest);
   }

   //update state variable and localStorage,
   //should be passed as prop in place of setState functions
   const onUpdateMeetingID = (meetingID) => {
      storeCurrentMeeting(meetingID);
   }

   return (
      <div style={{paddingBottom: "4rem", height: "100%"}}>
         <Header/>
         <div style={{paddingTop: "2rem"}}>
            <Route path='/'> <LandingPage currentGuest={currentGuest}/> </Route>
            <Route path='/create'>
               <CreateMeeting
                  currentGuest={currentGuest}
                  onUpdateGuest={onUpdateGuest}
                  onUpdateMeetingID={onUpdateMeetingID}
               />
            </Route>
            <Route path='/edit'>
               <EditMeeting
                  currentGuest={currentGuest}
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
         </div>
         <Footer/>
         <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{marginTop: "40px", marginBottom: "40px"}}
         />
      </div>
   );
};

export default App;
