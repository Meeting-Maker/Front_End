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


const App = () => {
   const [currentUser, setCurrentUser] = useState({userID: null});
   const [currentMeeting, setCurrentMeeting] = useState('');

   return (
      <div>
         <Header />
         <Route path='/'> <LandingPage currentUser={currentUser}/> </Route>
         <Route path='/create'>
            <CreateMeeting
               currentUser={currentUser}
               setCurrentUser={setCurrentUser}
               setCurrentMeeting={setCurrentMeeting}
            />
         </Route>
         <Route path='/join'>
            <JoinMeeting
               currentUser={currentUser}
               setCurrentMeeting={setCurrentMeeting}
            />
         </Route>
         <Route path='/meeting'>
            <Meeting
               currentUser={currentUser}
               currentMeeting={currentMeeting}
            />
         </Route>
         <Footer/>
      </div>
   );
};

export default App;
