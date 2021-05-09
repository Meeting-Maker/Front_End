import React, {useState, useEffect} from 'react';
import Route from '../router/Route';
import Header from './Header';
import LandingPage from './LandingPage';
import Footer from './Footer';
import CreateMeeting from './CreateMeeting';
import JoinMeeting from './JoinMeeting';
import Register from './Register';
import Meeting from './Meeting';
import ProfilePage from './ProfilePage';
import CreateGuest from './CreateGuest';

const App = () => {
   const [guestID, setGuestID] = useState(null);
   const [meetingID, setMeetingID] = useState('');

   useEffect(
      () => {
         const fetchGuestID = async () => {
            const tempGuestID = localStorage.getItem('guestID');
            await setGuestID(tempGuestID);
            console.log('GUEST LOADED: ' + tempGuestID);
         }
         fetchGuestID();
      }
      , []
   );

   const onUpdateGuestID = (newGuestID) => {
      localStorage.setItem('guestID', newGuestID)
      setGuestID(newGuestID);
   }

   return (
      <div>
         <Header />
         <Route path='/'> <LandingPage guestID={guestID}/> </Route>

         {/*<Route path='/createGuest'><CreateGuest/></Route>*/}

         <Route path='/create'>
            <CreateMeeting
               guestID={guestID}
               setGuestID={onUpdateGuestID}
               meetingID={meetingID}
               setMeetingID={setMeetingID}
            />
         </Route>
         <Route path='/join'>
            <JoinMeeting
               guestID={guestID}
               setMeetingID={setMeetingID}
            />
         </Route>
         <Route path='/meeting'>
            <Meeting
               guestID={guestID}
               meetingID={meetingID}
            />
         </Route>
         <Footer/>
      </div>
   );
};

export default App;
